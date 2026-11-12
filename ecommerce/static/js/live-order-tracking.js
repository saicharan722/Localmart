(() => {
  const cfg = window.LOCALMART_TRACKING;
  if (!cfg) return;
  const el = (id) => document.getElementById(id);
  const csrf = () => document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("csrftoken="))?.slice(10) || "";
  let map = null, markerPartner = null, markerCustomer = null, markerStore = null, markerCurrent = null, routeLine = null;
  let latest = null, lastRouteOrigin = null, lastRouteCustomer = null, lastRouteMode = "", lastRouteAt = 0, routeRequest = 0;
  let pollTimer = null, socket = null, geolocationAsked = false, manualPin = null, didInitialFit = false;
  const asPoint = (point) => point && Number.isFinite(Number(point.latitude)) && Number.isFinite(Number(point.longitude))
    ? {lat: Number(point.latitude), lng: Number(point.longitude)} : null;

  function showNotice(message) { el("mapNotice").textContent = message; el("mapNotice").hidden = false; }
  function hideNotice() { el("mapNotice").hidden = true; }
  function markerIcon(kind, glyph) {
    return L.divIcon({className: "localmart-leaflet-icon", html: `<span class="lm-map-pin ${kind}"><b>${glyph}</b></span>`, iconSize: [42, 48], iconAnchor: [21, 43], popupAnchor: [0, -40]});
  }

  function initMap() {
    if (!window.L) { showNotice("The Leaflet map library could not load. Check your internet connection and try again."); return; }
    map = L.map("trackingMap", {zoomControl: false, scrollWheelZoom: true}).setView([0, 0], 2);
    L.control.zoom({position: "bottomright"}).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      referrerPolicy: "strict-origin-when-cross-origin",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.on("click", (event) => {
      if (el("manualLocation").hidden || !manualPin) return;
      manualPin = {lat: event.latlng.lat, lng: event.latlng.lng};
      el("manualPinNote").textContent = `Selected point: ${manualPin.lat.toFixed(5)}, ${manualPin.lng.toFixed(5)}. Confirm this pin to save it as the delivery destination.`;
      markerCustomer = setMarker(markerCustomer, manualPin, "Selected delivery location", "customer", "&#128205;");
      el("confirmDeliveryLocation").disabled = false;
    });
    map.on("tileerror", () => showNotice("OpenStreetMap tiles could not load. Check your internet connection."));
    hideNotice();
    window.setTimeout(() => map.invalidateSize(), 100);
    if (latest) updateMap(latest);
  }

  function renderTimeline(data) {
    el("statusPill").textContent = data.status_label;
    const timeline = el("timeline"); timeline.replaceChildren();
    data.timeline.forEach((step) => {
      const node = document.createElement("div");
      node.className = `timeline-step${step.complete ? " done" : ""}${step.current ? " current" : ""}${step.cancelled ? " cancelled" : ""}`;
      node.textContent = step.label; timeline.append(node);
    });
  }

  function setMarker(existing, point, title, kind, glyph) {
    if (!point || !map) return existing;
    const position = [point.lat, point.lng];
    if (!existing) return L.marker(position, {title, icon: markerIcon(kind, glyph), keyboard: true}).addTo(map).bindPopup(title);
    existing.setLatLng(position);
    existing.options.title = title;
    return existing;
  }

  function metersBetween(a, b) {
    if (!a || !b) return Infinity;
    const rad = (value) => value * Math.PI / 180;
    const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
    const term = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(term), Math.sqrt(1 - term));
  }

  function updateMap(data) {
    if (!map) return;
    const store = asPoint(data.merchant), customer = data.customer_location_confirmed ? asPoint(data.customer) : null, partner = asPoint(data.partner_location), current = asPoint(data.customer_current_location);
    const pickupType = data.pickup_type || "Store";
    if (store) markerStore = setMarker(markerStore, store, data.merchant.name || pickupType, "store", "&#127979;");
    else if (markerStore) { markerStore.remove(); markerStore = null; }
    if (customer) markerCustomer = setMarker(markerCustomer, customer, data.customer.address || "Confirmed delivery address", "customer", "&#128205;");
    else if (markerCustomer && !manualPin) { markerCustomer.remove(); markerCustomer = null; }
    markerCurrent = setMarker(markerCurrent, current, "Your current device GPS", "current", "&#128309;");
    markerPartner = setMarker(markerPartner, partner, `${data.partner.name} ${data.partner.id || ""}`, "partner", "&#128757;");

    if (!didInitialFit) {
      const available = [store, partner, customer, current].filter(Boolean);
      if (available.length === 1) map.setView([available[0].lat, available[0].lng], 14);
      else if (available.length > 1) map.fitBounds(L.latLngBounds(available.map((point) => [point.lat, point.lng])), {padding: [55, 55], maxZoom: 15});
      if (available.length) didInitialFit = true;
    }

    const missingLocations = [];
    if (!store) missingLocations.push(`${pickupType.toLowerCase()} pin: merchant address and exact map pin need confirmation`);
    if (!customer) missingLocations.push(current ? "delivery destination pin: confirm the saved delivery address" : "customer pin: confirm the delivery address or allow device GPS");
    if (!partner) missingLocations.push("delivery partner pin: waiting for real GPS from the partner's device");
    const locationStatus = missingLocations.length
      ? `Map locations still needed — ${missingLocations.join("; ")}. No locations are simulated.`
      : `${pickupType}, confirmed delivery point, and delivery partner GPS are shown.`;

    const partnerStarted = ["picked_up", "out_for_delivery", "arriving_soon"].includes(data.status) && partner;
    const origin = partnerStarted ? partner : customer;
    const destination = partnerStarted ? customer : store;
    const mode = partnerStarted ? "partner" : "customer-to-merchant";
    if (!origin || !customer || !data.merchant.location_confirmed || !data.customer_location_confirmed) {
      if (routeLine) { routeLine.remove(); routeLine = null; }
      showNotice(`${locationStatus} A road route appears after the ${pickupType.toLowerCase()} and delivery pins are confirmed.`);
      return;
    }
    const now = Date.now();
    const destinationChanged = !lastRouteCustomer || metersBetween(lastRouteCustomer, destination) > 10;
    const originMoved = !lastRouteOrigin || metersBetween(lastRouteOrigin, origin) > 100;
    const routeModeChanged = mode !== lastRouteMode;
    if (routeLine && !destinationChanged && !originMoved && !routeModeChanged) return;
    if (now - lastRouteAt < 10000 && lastRouteAt && !routeModeChanged && !destinationChanged) return;

    lastRouteOrigin = origin; lastRouteCustomer = destination; lastRouteMode = mode; lastRouteAt = now;
    el("etaLabel").textContent = partnerStarted ? "ESTIMATED ARRIVAL" : `CUSTOMER TO ${pickupType.toUpperCase()} ROUTE`;
    const requestId = ++routeRequest;
    const coordinates = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`;
    fetch(url, {headers: {Accept: "application/json"}}).then((response) => {
      if (!response.ok) throw new Error("Route service unavailable");
      return response.json();
    }).then((result) => {
      if (requestId !== routeRequest) return;
      const route = result.code === "Ok" && result.routes?.[0];
      if (!route) throw new Error("No road route found");
      const points = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      if (routeLine) routeLine.remove();
      routeLine = L.polyline(points, {color: "#14A94A", weight: 6, opacity: 0.88, lineCap: "round", lineJoin: "round"}).addTo(map);
      el("etaValue").textContent = `${Math.max(1, Math.ceil(route.duration / 60))} min`;
      el("distanceValue").textContent = `${(route.distance / 1000).toFixed(1)} km ${partnerStarted ? "remaining" : "route"}`;
      if (missingLocations.length) showNotice(locationStatus);
      else hideNotice();
      if (!didInitialFit) { map.fitBounds(routeLine.getBounds(), {padding: [45, 45]}); didInitialFit = true; }
    }).catch(() => {
      if (requestId === routeRequest) {
        lastRouteOrigin = null; lastRouteCustomer = customer; lastRouteMode = mode;
        showNotice(`The road route is temporarily unavailable. ${locationStatus}`);
      }
    });
  }

  function render(data) {
    latest = data;
    el("orderNumber").textContent = data.order_number;
    el("orderTotal").textContent = `\u20b9${data.order.total}`;
    if (data.status === "delivered") el("etaValue").textContent = "Delivered";
    else if (!routeLine) el("etaValue").textContent = data.eta_minutes ? `${data.eta_minutes} min` : "Waiting for route";
    const isEnRoute = ["picked_up", "out_for_delivery", "arriving_soon"].includes(data.status);
    el("etaLabel").textContent = isEnRoute ? "ESTIMATED ARRIVAL" : `${(data.pickup_type || "Store").toUpperCase()} TO CUSTOMER DRIVE`;
    if (!routeLine && data.remaining_km != null) el("distanceValue").textContent = `${data.remaining_km} km ${isEnRoute ? "remaining" : "route"}`;
    el("partnerName").textContent = data.partner.name;
    el("partnerCode").textContent = data.partner.id ? `Delivery Partner ID: ${data.partner.id}` : "";
    el("partnerVehicle").textContent = `${data.partner.vehicle || "Delivery partner"}${data.partner.vehicle_number ? ` • ${data.partner.vehicle_number}` : ""}`;
    el("partnerPhone").textContent = data.partner.id
      ? (data.partner.phone ? `Phone: ${data.partner.phone}` : "Contact number not provided for this demo partner.")
      : "Partner contact details will appear after assignment.";
    if (data.partner.photo_url) { const img = document.createElement("img"); img.src = data.partner.photo_url; img.alt = "Delivery partner"; el("partnerAvatar").replaceChildren(img); }
    const call = el("callPartner");
    const phoneDigits = String(data.partner.phone || "").replace(/\D/g, "");
    if (phoneDigits.length >= 7 && phoneDigits.length <= 15) { call.href = `tel:${data.partner.phone.replace(/[^+\d]/g, "")}`; call.textContent = "Call"; call.classList.remove("disabled"); call.removeAttribute("aria-disabled"); }
    else { call.removeAttribute("href"); call.textContent = "Unavailable"; call.classList.add("disabled"); call.setAttribute("aria-disabled", "true"); }
    el("gpsUpdated").textContent = data.partner_location.updated_at ? `GPS updated ${new Date(data.partner_location.updated_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}` : "Waiting for partner GPS...";
    el("merchantName").textContent = data.merchant.name;
    el("merchantAddress").textContent = data.merchant.address || "Store address has not been configured yet.";
    if (data.customer.address) el("customerAddress").textContent = data.customer.address;
    el("locationAccuracyNote").textContent = data.customer_location_confirmed ? "Delivery point confirmed" : "Delivery address is not confirmed yet. Review and confirm its map pin.";
    const current = asPoint(data.customer_current_location), destination = asPoint(data.customer);
    if (current && destination && data.customer_location_confirmed) {
      const difference = metersBetween(current, destination);
      el("gpsDifference").textContent = difference > 100 ? `Your current GPS is ${Math.round(difference)} m from the saved delivery point. The delivery address remains unchanged.` : "Your current GPS is close to the saved delivery point. The delivery address remains unchanged.";
    }
    el("useCurrentGps").disabled = !current;
    const list = el("orderItems"); list.replaceChildren();
    data.order.items.forEach((item) => { const row = document.createElement("div"); row.className = "order-item"; const name = document.createElement("span"); name.textContent = `${item.name} x ${item.quantity}`; const price = document.createElement("strong"); price.textContent = `\u20b9${(Number(item.price) * Number(item.quantity)).toFixed(2)}`; row.append(name, price); list.append(row); });
    renderTimeline(data); updateMap(data);
  }

  async function refresh() {
    try {
      const response = await fetch(cfg.apiUrl, {headers: {Accept: "application/json"}, cache: "no-store"});
      if (response.ok) {
        render(await response.json());
        if (!geolocationAsked) requestCustomerLocation();
      }
    } catch (_) { /* polling continues while the connection recovers */ }
  }

  async function sendCustomerLocation(latitude, longitude, accuracy = null) {
    const response = await fetch(cfg.locationUrl, {method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": csrf()}, body: JSON.stringify({latitude, longitude, accuracy})});
    if (!response.ok) throw new Error("Could not save delivery location");
    if (latest) { latest.customer_current_location = {latitude, longitude, accuracy}; updateMap(latest); }
  }

  function showManualLocation(message) {
    el("manualLocation").hidden = false;
    showNotice(message);
  }

  function requestCustomerLocation() {
    if (geolocationAsked) return;
    geolocationAsked = true;
    if (!navigator.geolocation) return showManualLocation("This device does not provide GPS. The saved delivery address remains the route destination; confirm its pin below.");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const {latitude, longitude, accuracy} = position.coords;
      try {
        await sendCustomerLocation(latitude, longitude, accuracy);
      } catch (_) { showManualLocation("We found your GPS, but could not save the optional current-location marker."); }
    }, () => { /* GPS is optional. The saved delivery address still works. */ }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 30000});
  }

  el("geocodeAddress").addEventListener("click", async () => {
    const address = el("manualAddress").value.trim();
    if (!address) { el("manualAddress").focus(); return; }
    try {
      el("manualPinNote").textContent = "Looking up the entered address…";
      const response = await fetch(cfg.confirmLocationUrl, {method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": csrf()}, body: JSON.stringify({address})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Address could not be located");
      manualPin = {lat: Number(result.candidate.latitude), lng: Number(result.candidate.longitude)};
      markerCustomer = setMarker(markerCustomer, manualPin, "Address lookup result — confirm exact pin", "customer", "&#128205;");
      map.setView([manualPin.lat, manualPin.lng], 17, {animate: true});
      el("manualPinNote").textContent = `Found: ${result.candidate.address}. Review the pin and click your exact entrance on the map if needed.`;
      el("confirmDeliveryLocation").disabled = false;
      el("useCurrentGps").disabled = !latest?.customer_current_location?.latitude;
    } catch (error) { manualPin = {lat: NaN, lng: NaN}; el("confirmDeliveryLocation").disabled = true; el("manualPinNote").textContent = `${error.message} Click the exact delivery point on the map, then confirm it.`; }
  });
  el("manualAddress").addEventListener("input", () => { manualPin = null; el("confirmDeliveryLocation").disabled = true; });

  el("confirmDeliveryLocation").addEventListener("click", async () => {
    if (!manualPin) return;
    const address = el("manualAddress").value.trim();
    try {
      const response = await fetch(cfg.confirmLocationUrl, {method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": csrf()}, body: JSON.stringify({address, latitude: manualPin.lat, longitude: manualPin.lng})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not confirm this location");
      el("manualPinNote").textContent = "Delivery location confirmed.";
      refresh();
    } catch (error) { el("manualPinNote").textContent = error.message; }
  });

  el("useCurrentGps").addEventListener("click", async () => {
    const point = asPoint(latest?.customer_current_location);
    if (!point) return;
    manualPin = point;
    markerCustomer = setMarker(markerCustomer, manualPin, "GPS point — confirm as delivery destination", "customer", "&#128205;");
    map.setView([point.lat, point.lng], 17, {animate: true});
    el("manualPinNote").textContent = "Your GPS differs from the saved address. Confirm only if you want to change the delivery destination to this point.";
    el("confirmDeliveryLocation").disabled = false;
  });

  el("centerDelivery").addEventListener("click", () => {
    const point = asPoint(latest?.partner_location) || asPoint(latest?.customer) || asPoint(latest?.merchant) || asPoint(latest?.customer_current_location);
    if (point && map) map.setView([point.lat, point.lng], 15, {animate: true});
  });

  function startPolling() { if (!pollTimer) { refresh(); pollTimer = window.setInterval(refresh, 6000); } }
  function connectWebSocket() {
    if (!("WebSocket" in window)) return startPolling();
    const scheme = location.protocol === "https:" ? "wss" : "ws";
    socket = new WebSocket(`${scheme}://${location.host}/ws/order/${cfg.orderId}/tracking/`);
    socket.onopen = () => { if (pollTimer) { clearInterval(pollTimer); pollTimer = null; } };
    socket.onmessage = (event) => { try { render(JSON.parse(event.data)); } catch (_) {} };
    socket.onerror = () => { if (socket.readyState !== WebSocket.OPEN) startPolling(); };
    socket.onclose = () => startPolling();
  }

  initMap();
  refresh();
  connectWebSocket();
})();
