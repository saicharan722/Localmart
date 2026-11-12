(() => {
  const root = document.getElementById("merchantDeliveries"), endpoint = window.MERCHANT_DELIVERY_API;
  const csrf = () => document.cookie.split(";").map((x) => x.trim()).find((x) => x.startsWith("csrftoken="))?.slice(10) || "";
  async function load() {
    try {
      const response = await fetch(endpoint, {cache: "no-store"}), data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load deliveries.");
      root.replaceChildren();
      if (!data.deliveries.length) { const empty = document.createElement("article"); empty.className = "card"; empty.textContent = "No active deliveries are linked to this store yet."; root.append(empty); return; }
      data.deliveries.forEach((delivery) => {
        const card = document.createElement("article"); card.className = "card driver-order";
        const status = document.createElement("span"); status.className = "eyebrow"; status.textContent = delivery.status_label;
        const title = document.createElement("h2"); title.textContent = `Order ${delivery.number}`;
        const partnerDetails = delivery.partner_id
          ? ` · Partner ID: DP-${String(delivery.partner_id).padStart(4, "0")} · ${delivery.partner_vehicle || "Vehicle details unavailable"}${delivery.partner_vehicle_number ? ` (${delivery.partner_vehicle_number})` : ""} · Contact: ${delivery.partner_phone || "Not provided"}`
          : "";
        const details = document.createElement("p"); details.textContent = `${delivery.customer} · ₹${delivery.total} · Partner: ${delivery.partner_name}${partnerDetails} · GPS: ${delivery.partner_location}`;
        const select = document.createElement("select"); select.className = "outline-btn"; select.setAttribute("aria-label", "Assign delivery partner");
        const availablePartners = data.partners.filter((partner) => partner.available);
        const blank = document.createElement("option"); blank.value = ""; blank.textContent = availablePartners.length ? "Choose available partner" : "No available partners"; select.append(blank);
        availablePartners.forEach((partner) => { const option = document.createElement("option"); option.value = partner.id; option.textContent = `${partner.name} (Available)`; option.selected = String(partner.id) === String(delivery.partner_id); select.append(option); });
        select.disabled = !availablePartners.length;
        select.addEventListener("change", async () => {
          if (!select.value) return;
          const partnerId = select.value;
          select.disabled = true;
          try {
            const result = await fetch(`/api/merchant/deliveries/${delivery.order_id}/assign/`, {method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": csrf()}, body: JSON.stringify({partner_id: partnerId})});
            const body = await result.json();
            if (!result.ok) throw new Error(body.error || "Could not assign this delivery partner.");
            await load();
          } catch (e) { alert(e.message); select.disabled = false; select.value = ""; }
        });
        const actions = document.createElement("div"); actions.className = "driver-actions"; actions.append(select);
        const nextStatus = delivery.status === "placed" ? "confirmed" : delivery.status === "confirmed" ? "preparing" : null;
        if (nextStatus) {
          const updateStatus = document.createElement("button"); updateStatus.className = "secondary";
          updateStatus.textContent = nextStatus === "confirmed" ? "Confirm order" : "Mark preparing";
          updateStatus.addEventListener("click", async () => {
            try {
              const response = await fetch(delivery.status_url, {method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": csrf()}, body: JSON.stringify({status: nextStatus})});
              const result = await response.json(); if (!response.ok) throw new Error(result.error || "Could not update order status."); load();
            } catch (e) { alert(e.message); }
          });
          actions.append(updateStatus);
        }
        const track = document.createElement("a"); track.className = "outline-btn"; track.href = `/order/${delivery.order_id}/track/`; track.textContent = "View live route"; actions.append(track);
        card.append(status, title, details, actions); root.append(card);
      });
    } catch (e) { root.textContent = e.message; }
  }
  load(); window.setInterval(load, 15000);
})();
