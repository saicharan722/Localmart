document.addEventListener("DOMContentLoaded", () => {
  const address = document.getElementById("customerAddress");
  const mapNode = document.getElementById("checkoutDeliveryMap");
  const locate = document.getElementById("locateCheckoutAddress");
  const confirm = document.getElementById("confirmCheckoutPin");
  const pay = document.getElementById("payButton");
  const note = document.getElementById("checkoutPinNote");
  if (!address || !mapNode || !locate || !confirm || !pay) return;
  window.LOCALMART_CHECKOUT_DELIVERY = null;
  pay.disabled = true;
  if (!window.L) { note.textContent = "The map could not load. Reload the page to confirm your delivery location."; return; }

  const map = L.map(mapNode).setView([0, 0], 2);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    referrerPolicy: "strict-origin-when-cross-origin",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  let marker = null, selected = null;

  function choosePin(lat, lng, message) {
    selected = {latitude: Number(lat), longitude: Number(lng)};
    if (marker) marker.setLatLng([selected.latitude, selected.longitude]);
    else marker = L.marker([selected.latitude, selected.longitude], {draggable: true}).addTo(map);
    marker.off("dragend").on("dragend", event => {
      const point = event.target.getLatLng();
      selected = {latitude: point.lat, longitude: point.lng};
      confirm.disabled = false;
      window.LOCALMART_CHECKOUT_DELIVERY = null;
      pay.disabled = true;
      note.textContent = "Pin moved. Confirm the exact delivery point.";
    });
    map.setView([selected.latitude, selected.longitude], 17, {animate: true});
    window.LOCALMART_CHECKOUT_DELIVERY = null;
    confirm.disabled = false;
    pay.disabled = true;
    note.textContent = message;
  }

  map.on("click", event => choosePin(event.latlng.lat, event.latlng.lng, "Map point selected. Confirm this as your delivery destination."));
  address.addEventListener("input", () => {
    selected = null;
    window.LOCALMART_CHECKOUT_DELIVERY = null;
    confirm.disabled = true;
    pay.disabled = true;
    note.textContent = "Address changed. Locate and confirm its pin again.";
  });
  locate.addEventListener("click", async () => {
    if (!address.value.trim()) { address.focus(); return; }
    locate.disabled = true;
    note.textContent = "Looking up delivery address…";
    try {
      const csrf = document.cookie.split(";").map(value => value.trim()).find(value => value.startsWith("csrftoken="))?.slice(10) || "";
      const response = await fetch("/api/geocode/address/", {method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": csrf}, body: JSON.stringify({address: address.value.trim()})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Address lookup failed.");
      choosePin(result.candidate.latitude, result.candidate.longitude, `Found ${result.candidate.address}. Review it and adjust to your exact entrance.`);
    } catch (error) {
      note.textContent = `${error.message} You can center the map with your device GPS or select the exact point manually.`;
    } finally { locate.disabled = false; }
  });
  document.getElementById("centerCheckoutOnGps")?.addEventListener("click", () => {
    if (!navigator.geolocation) { note.textContent = "This device does not provide GPS."; return; }
    navigator.geolocation.getCurrentPosition(position => choosePin(position.coords.latitude, position.coords.longitude, "Current GPS selected. Confirm only if this is your delivery entrance."), () => { note.textContent = "GPS permission was denied. Locate your address or select the point on the map."; }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 30000});
  });
  confirm.addEventListener("click", () => {
    if (!selected || !address.value.trim()) return;
    window.LOCALMART_CHECKOUT_DELIVERY = {...selected, address: address.value.trim()};
    confirm.disabled = true;
    pay.disabled = false;
    note.textContent = "Delivery location confirmed. You can continue to payment.";
  });
  window.setTimeout(() => map.invalidateSize(), 150);
});
