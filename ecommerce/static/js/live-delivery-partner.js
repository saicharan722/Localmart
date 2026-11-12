(() => {
  const endpoint = window.DELIVERY_API;
  const root = document.getElementById("partnerOrders");
  if (!endpoint || !root) return;

  const $ = (id) => document.getElementById(id);
  const csrf = () => document.cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith("csrftoken="))?.slice(10) || "";
  const gpsWatches = new Map();
  const lastSent = new Map();
  let map = null;
  let mapMarkers = [];
  let currentOrder = null;
  let loading = false;

  async function api(url, data) {
    const response = await fetch(url, {
      method: data ? "POST" : "GET",
      headers: data ? {"Content-Type": "application/json", "X-CSRFToken": csrf()} : {},
      body: data ? JSON.stringify(data) : undefined,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Request failed");
    return result;
  }

  function coordinates(value) {
    if (typeof value !== "string" || !value.includes(",")) return null;
    const pair = value.split(",").map(Number);
    return pair.length === 2 && pair.every(Number.isFinite) && Math.abs(pair[0]) <= 90 && Math.abs(pair[1]) <= 180 ? pair : null;
  }

  function distanceKm(a, b) {
    const rad = (n) => n * Math.PI / 180;
    const dLat = rad(b[0] - a[0]), dLng = rad(b[1] - a[1]);
    const v = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(v), Math.sqrt(1 - v));
  }

  function initMap() {
    if (map || !window.L || !$("trackingMap")) return;
    map = L.map("trackingMap", {zoomControl: true, scrollWheelZoom: false}).setView([20.59, 78.96], 4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      referrerPolicy: "strict-origin-when-cross-origin",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  function updateMap(order) {
    const empty = $("mapEmpty");
    if (!order || !window.L) {
      empty?.classList.remove("hidden");
      mapMarkers.forEach((marker) => marker.remove()); mapMarkers = [];
      return;
    }
    initMap();
    mapMarkers.forEach((marker) => marker.remove()); mapMarkers = [];
    const pickup = coordinates(order.pickup);
    const dropoff = coordinates(order.destination);
    const rider = order.partner_latitude != null && order.partner_longitude != null && Number.isFinite(Number(order.partner_latitude)) && Number.isFinite(Number(order.partner_longitude))
      ? [Number(order.partner_latitude), Number(order.partner_longitude)] : null;
    const points = [];
    const addPin = (point, kind, label, glyph) => {
      if (!point) return;
      const icon = L.divIcon({className: "", html: `<span class="lm-driver-pin ${kind}"><b>${glyph}</b></span>`, iconSize: [30, 34], iconAnchor: [15, 30]});
      const popup = document.createElement("span"); popup.textContent = label;
      const marker = L.marker(point, {icon}).addTo(map).bindPopup(popup);
      mapMarkers.push(marker); points.push(point);
    };
    addPin(pickup, "", `${order.pickup_name || order.pickup_type} (Pickup)`, "P");
    addPin(rider, "rider", "You (Delivery Partner)", "●");
    addPin(dropoff, "drop", "Customer (Drop-off)", "D");
    if (points.length >= 2) map.fitBounds(L.latLngBounds(points).pad(0.2), {maxZoom: 14});
    else if (points.length === 1) map.setView(points[0], 14);
    empty?.classList.toggle("hidden", points.length > 0);
    window.setTimeout(() => map.invalidateSize(), 50);
  }

  function renderTimeline(order) {
    const timeline = $("statusTimeline");
    timeline.replaceChildren();
    $("statusOrder").textContent = `Order #${order.number}`;
    (order.timeline || []).forEach((step) => {
      const row = document.createElement("div"); row.className = `status-step${step.complete ? " done" : ""}${step.current ? " current" : ""}`;
      const dot = document.createElement("span"); dot.className = "status-dot"; dot.textContent = step.complete ? "✓" : step.current ? "•" : "·";
      const copy = document.createElement("div");
      const title = document.createElement("b"); title.textContent = step.label;
      const hint = document.createElement("small"); hint.textContent = step.complete ? "Completed" : step.current ? "In progress" : "Pending";
      copy.append(title, hint); row.append(dot, copy); timeline.append(row);
    });
  }

  function renderRoute(order) {
    const pickup = document.createElement("div"); pickup.className = "route-place pickup";
    const pickupSmall = document.createElement("small"); pickupSmall.textContent = `${order.pickup_type} · Pickup`;
    const pickupName = document.createElement("b"); pickupName.textContent = order.pickup_name || "LocalMart merchant";
    const pickupAddress = document.createElement("span"); pickupAddress.textContent = order.pickup_address || "Pickup address not available";
    pickup.append(pickupSmall, pickupName, pickupAddress);
    const arrow = document.createElement("div"); arrow.className = "route-arrow"; arrow.textContent = "→";
    const drop = document.createElement("div"); drop.className = "route-place dropoff";
    const dropSmall = document.createElement("small"); dropSmall.textContent = "Drop-off";
    const dropName = document.createElement("b"); dropName.textContent = order.customer || "Customer";
    const dropAddress = document.createElement("span"); dropAddress.textContent = order.destination_address;
    drop.append(dropSmall, dropName, dropAddress);
    const points = document.createElement("div"); points.className = "route-points"; points.append(pickup, arrow, drop);
    root.replaceChildren(points);

    const from = coordinates(order.pickup), to = coordinates(order.destination);
    $("routeDistance").textContent = from && to ? `~${distanceKm(from, to).toFixed(1)} km direct` : "Not available";
    $("routeEta").textContent = "Not available";
    $("routeTotal").textContent = `₹${order.total}`;
    $("orderHeading").textContent = `Order #${order.number} · ${order.customer}`;
    $("activeBadge").textContent = order.accepted ? "Active" : "New request";
    $("activeBadge").classList.toggle("waiting", !order.accepted);
    renderTimeline(order);
    updateMap(order);
    renderActions(order);
  }

  function renderActions(order) {
    const actions = $("currentActions"); actions.replaceChildren();
    const button = (label, className, click) => {
      const el = document.createElement("button"); el.type = "button"; el.className = className; el.textContent = label; el.addEventListener("click", click); actions.append(el); return el;
    };
    if (!order.accepted) {
      button("Accept Delivery", "green-action", async () => {
        try { await api(`/api/orders/${order.order_id}/tracking/accept/`, {}); startGps(order.order_id); await load(); }
        catch (error) { alert(error.message); }
      });
      button("Decline", "muted-action", async () => {
        if (!confirm("Decline this delivery? It will be offered to another available partner.")) return;
        try { await api(`/api/orders/${order.order_id}/tracking/reject/`, {}); await load(); }
        catch (error) { alert(error.message); }
      });
    } else {
      const next = order.status === "partner_assigned" ? ["partner_at_store", `Reached ${order.pickup_type.toLowerCase()}`]
        : order.status === "partner_at_store" ? ["picked_up", "Confirm Pickup"]
        : order.status === "picked_up" ? ["out_for_delivery", "Start Delivery"]
        : order.status === "out_for_delivery" ? ["arriving_soon", "Arriving Soon"]
        : order.status === "arriving_soon" ? ["delivered", "Mark Delivered"] : null;
      if (next) button(next[1], "green-action", async () => {
        try { await api(`/api/orders/${order.order_id}/tracking/status/`, {status: next[0]}); if (["picked_up", "out_for_delivery"].includes(next[0])) startGps(order.order_id); await load(); }
        catch (error) { alert(error.message); }
      });
    }
    button(order.status === "partner_assigned" || order.status === "partner_at_store" ? "Navigate to Pickup" : "Navigate to Customer", "", () => navigate(order));
    if (order.accepted) startGps(order.order_id);
  }

  function navigate(order) {
    const target = coordinates(order.status === "partner_assigned" || order.status === "partner_at_store" ? order.pickup : order.destination);
    if (!target) { alert("The destination coordinates have not been confirmed yet."); return; }
    const open = (start) => {
      const route = start ? `${start[0]},${start[1]};${target[0]},${target[1]}` : `${target[0]},${target[1]}`;
      window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${encodeURIComponent(route)}`, "_blank", "noopener");
    };
    if (!navigator.geolocation) return open(null);
    navigator.geolocation.getCurrentPosition((pos) => open([pos.coords.latitude, pos.coords.longitude]), () => open(null), {enableHighAccuracy: true, timeout: 10000, maximumAge: 30000});
  }

  function renderRecent(recent) {
    const list = $("recentList"); list.replaceChildren();
    if (!recent?.length) { const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = "Completed deliveries will appear here."; list.append(empty); return; }
    recent.forEach((item) => {
      const row = document.createElement("div"); row.className = "recent-row";
      const info = document.createElement("div"); const title = document.createElement("b"); title.textContent = `#${item.number} · ${item.category || "Order"}`;
      const date = document.createElement("small"); date.textContent = new Date(item.created_at).toLocaleString(); info.append(title, date);
      const tag = document.createElement("span"); tag.className = "delivered-tag"; tag.textContent = "Delivered";
      row.append(info, tag); list.append(row);
    });
  }

  function startGps(orderId) {
    if (!navigator.geolocation || gpsWatches.has(orderId)) return;
    const watchId = navigator.geolocation.watchPosition(async (position) => {
      const now = Date.now(); if (now - (lastSent.get(orderId) || 0) < 4500) return;
      lastSent.set(orderId, now);
      const coords = position.coords;
      try { await api(window.LIVE_LOCATION_API, {order_id: orderId, latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy, speed: coords.speed, device_timestamp_ms: position.timestamp}); }
      catch (_) { /* A later GPS update retries without interrupting the route. */ }
    }, (error) => { $("partnerAvailability").textContent = `GPS location unavailable: ${error.message}`; }, {enableHighAccuracy: true, maximumAge: 3000, timeout: 20000});
    gpsWatches.set(orderId, watchId);
  }

  async function load() {
    if (loading) return;
    loading = true;
    try {
      const data = await api(endpoint);
      const stats = data.stats || {};
      const formatRupees = (value) => new Intl.NumberFormat("en-IN", {style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(value || 0));
      $("completedCount").textContent = stats.completed_today ?? "0";
      $("activeCount").textContent = stats.active ?? "0";
      $("pendingCount").textContent = stats.pending ?? "0";
      $("completedTotal").textContent = `${stats.completed_total ?? 0} completed`;
      $("earningsCompleted").textContent = stats.completed_total ?? 0;
      $("todayEarnings").textContent = formatRupees(stats.earned_today);
      $("totalEarnings").textContent = formatRupees(stats.earned_total);
      const online = Boolean(data.is_online);
      const toggle = $("availabilityToggle");
      toggle.dataset.online = String(online); toggle.textContent = online ? "◉  Go Offline" : "◉  Go Online";
      $("onlineLabel").textContent = online ? "Online" : "Offline";
      $("onlinePill").classList.toggle("offline", !online);
      $("availabilityTitle").textContent = online ? "You are currently ONLINE" : "You are currently OFFLINE";
      $("partnerAvailability").textContent = online ? "You can receive new delivery requests automatically." : "Go online to receive delivery requests.";
      renderRecent(data.recent);

      const activeIds = new Set(data.orders.map((order) => order.order_id));
      for (const [orderId, watchId] of gpsWatches) {
        if (!activeIds.has(orderId)) { navigator.geolocation?.clearWatch(watchId); gpsWatches.delete(orderId); lastSent.delete(orderId); }
      }
      currentOrder = data.orders[0] || null;
      if (!currentOrder) {
        root.innerHTML = '<div class="empty-state">No active delivery assigned right now. Stay online to receive new requests.</div>';
        $("orderHeading").textContent = "Waiting for your next delivery.";
        $("activeBadge").textContent = "Waiting"; $("activeBadge").classList.add("waiting");
        $("statusOrder").textContent = "Live delivery timeline";
        $("statusTimeline").innerHTML = '<p class="empty-state">No active delivery yet.</p>';
        $("currentActions").replaceChildren(); $("routeDistance").textContent = "—"; $("routeEta").textContent = "—"; $("routeTotal").textContent = "—";
        updateMap(null);
      } else renderRoute(currentOrder);
    } catch (error) {
      root.innerHTML = ""; const message = document.createElement("div"); message.className = "empty-state"; message.textContent = error.message; root.append(message);
    } finally { loading = false; }
  }

  $("availabilityToggle")?.addEventListener("click", async () => {
    const control = $("availabilityToggle");
    try { await api(window.AVAILABILITY_API, {is_online: control.dataset.online !== "true"}); await load(); }
    catch (error) { alert(error.message); }
  });

  $("updateLocation")?.addEventListener("click", () => {
    if (!navigator.geolocation) { alert("This device does not support GPS location."); return; }
    const button = $("updateLocation"); button.disabled = true; button.textContent = "Detecting location…";
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        await api(window.PROFILE_LOCATION_API, {latitude: position.coords.latitude, longitude: position.coords.longitude});
        button.textContent = "Location Updated";
      } catch (error) { alert(error.message); button.textContent = "⌖  Update Location"; }
      finally { button.disabled = false; window.setTimeout(() => { button.textContent = "⌖  Update Location"; }, 1800); }
      await load();
    }, (error) => { alert(`Unable to update location: ${error.message}`); button.disabled = false; button.textContent = "⌖  Update Location"; }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 0});
  });

  $("refreshDashboard")?.addEventListener("click", load);
  $("quickMap")?.addEventListener("click", (event) => { if (!currentOrder) { event.preventDefault(); alert("There is no active delivery map yet."); } });
  $("quickDirections")?.addEventListener("click", (event) => { event.preventDefault(); if (currentOrder) navigate(currentOrder); else alert("There is no active delivery route yet."); });
  $("mobileMenu")?.addEventListener("click", () => document.querySelector(".sidebar")?.classList.toggle("open"));
  document.querySelectorAll(".side-nav a").forEach((link) => link.addEventListener("click", () => document.querySelector(".sidebar")?.classList.remove("open")));
  initMap(); load(); window.setInterval(load, 8000);
})();
