(() => {
  const csrf = () => document.cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith("csrftoken="))?.slice(10) || "";
  async function post(url, data) {
    const response = await fetch(url, {method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": csrf()}, body: JSON.stringify(data)});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Request failed");
    return result;
  }

  const menu = document.getElementById("mobileMenu");
  menu?.addEventListener("click", () => document.querySelector(".sidebar")?.classList.toggle("open"));

  const settingsToggle = document.querySelector("[data-availability-toggle]");
  settingsToggle?.addEventListener("click", async () => {
    try {
      const result = await post(window.AVAILABILITY_API, {is_online: settingsToggle.dataset.online !== "true"});
      settingsToggle.dataset.online = String(result.is_online);
      settingsToggle.textContent = result.is_online ? "Go Offline" : "Go Online";
      const online = document.getElementById("settingsOnline");
      online.textContent = result.is_online ? "You are online" : "You are offline";
      online.classList.toggle("offline", !result.is_online);
      document.getElementById("onlineLabel").textContent = result.is_online ? "Online" : "Offline";
      document.getElementById("onlinePill").classList.toggle("offline", !result.is_online);
    } catch (error) { alert(error.message); }
  });

  const locationButton = document.getElementById("updateLocation");
  locationButton?.addEventListener("click", () => {
    const note = document.getElementById("locationMessage");
    if (!navigator.geolocation) { alert("This device does not support GPS location."); return; }
    locationButton.disabled = true; locationButton.textContent = "Detecting…";
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const result = await post(window.PROFILE_LOCATION_API, {latitude: position.coords.latitude, longitude: position.coords.longitude});
        note.textContent = `Location updated at ${new Date(result.updated_at).toLocaleString()}.`;
      } catch (error) { alert(error.message); }
      finally { locationButton.disabled = false; locationButton.textContent = "Update GPS Location"; }
    }, (error) => {
      alert(`Unable to update location: ${error.message}`);
      locationButton.disabled = false; locationButton.textContent = "Update GPS Location";
    }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 0});
  });

  const mapElement = document.getElementById("sectionMap");
  if (!mapElement || !window.DELIVERY_API) return;
  let map = null;
  let markers = [];
  let locationWatch = null;
  let lastLocationSent = 0;

  if (window.L) {
    map = L.map(mapElement, {zoomControl: true, scrollWheelZoom: false}).setView([20.59, 78.96], 4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19, referrerPolicy: "strict-origin-when-cross-origin", attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
  }

  function parsePair(value) {
    if (typeof value !== "string" || !value.includes(",")) return null;
    const pair = value.split(",").map(Number);
    return pair.length === 2 && pair.every(Number.isFinite) && Math.abs(pair[0]) <= 90 && Math.abs(pair[1]) <= 180 ? pair : null;
  }

  function setMarker(coords, kind, label, glyph) {
    if (!coords) return null;
    if (!map) return coords;
    const icon = L.divIcon({className: "", html: `<span class="lm-driver-pin ${kind}"><b>${glyph}</b></span>`, iconSize: [30, 34], iconAnchor: [15, 30]});
    const popup = document.createElement("span"); popup.textContent = label;
    const marker = L.marker(coords, {icon}).addTo(map).bindPopup(popup);
    markers.push(marker); return coords;
  }

  function startLiveLocation(orderId) {
    if (locationWatch !== null || !navigator.geolocation) return;
    locationWatch = navigator.geolocation.watchPosition(async (position) => {
      if (Date.now() - lastLocationSent < 4500) return;
      lastLocationSent = Date.now();
      const coords = position.coords;
      try { await post(window.LIVE_LOCATION_API, {order_id: orderId, latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy, speed: coords.speed, device_timestamp_ms: position.timestamp}); }
      catch (_) { /* Next GPS reading will retry. */ }
    }, (error) => { document.getElementById("sectionMapNote").textContent = `Partner GPS is unavailable: ${error.message}`; }, {enableHighAccuracy: true, maximumAge: 3000, timeout: 20000});
  }

  function showFallbackMap(points, label) {
    if (!points.length) return;
    const lats = points.map((point) => point[0]), lngs = points.map((point) => point[1]);
    const margin = 0.015;
    const west = Math.min(...lngs) - margin, east = Math.max(...lngs) + margin;
    const south = Math.min(...lats) - margin, north = Math.max(...lats) + margin;
    const marker = points[points.length - 1];
    const frame = document.createElement("iframe");
    frame.title = "OpenStreetMap delivery route";
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer-when-downgrade";
    frame.style.width = "100%"; frame.style.height = "100%"; frame.style.border = "0";
    frame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(`${west},${south},${east},${north}`)}&layer=mapnik&marker=${marker[0]},${marker[1]}`;
    mapElement.replaceChildren(frame);
    document.getElementById("sectionMapNote").textContent = `${label} · Map displayed using OpenStreetMap fallback.`;
  }

  async function refreshMap() {
    try {
      const data = await fetch(window.DELIVERY_API).then((response) => response.json());
      const order = data.orders?.[0];
      if (!order) {
        if (locationWatch !== null) navigator.geolocation?.clearWatch(locationWatch);
        locationWatch = null;
        return;
      }
      if (order.accepted) startLiveLocation(order.order_id);
      markers.forEach((marker) => marker.remove()); markers = [];
      const points = [];
      const pickupLabel = `${order.pickup_confirmed ? "" : "Approximate "}${order.pickup_name || order.pickup_type} pickup`;
      const pickup = setMarker(parsePair(order.pickup), "", pickupLabel, "P"); if (pickup) points.push(pickup);
      const rider = order.partner_latitude != null && order.partner_longitude != null ? [Number(order.partner_latitude), Number(order.partner_longitude)] : null;
      const riderPoint = setMarker(rider, "rider", "You (Delivery Partner)", "●"); if (riderPoint) points.push(riderPoint);
      const drop = setMarker(parsePair(order.destination), "drop", `${order.destination_confirmed ? "" : "Approximate "}customer drop-off`, "D"); if (drop) points.push(drop);
      if (map) {
        mapElement.querySelector("iframe")?.remove();
        if (points.length > 1) map.fitBounds(L.latLngBounds(points).pad(.18), {maxZoom: 14});
        else if (points.length === 1) map.setView(points[0], 14);
      } else if (points.length) {
        showFallbackMap(points, "Live delivery locations");
      }
      if (map) document.getElementById("sectionMapNote").textContent = points.length > 1
        ? "Map shows available pickup/drop-off locations and the latest partner GPS position. Approximate address locations are labelled."
        : "Some pickup, drop-off, or partner GPS coordinates are not available yet. The map does not use fabricated locations.";
      else if (!points.length) document.getElementById("sectionMapNote").textContent = "No order or partner coordinates are available yet, so the map cannot place a marker.";
      if (map) window.setTimeout(() => map.invalidateSize(), 50);
    } catch (_) { document.getElementById("sectionMapNote").textContent = "Live delivery map is temporarily unavailable."; }
  }
  refreshMap(); window.setInterval(refreshMap, 8000);
})();
