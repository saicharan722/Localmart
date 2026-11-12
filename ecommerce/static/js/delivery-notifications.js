(() => {
  const center = document.querySelector("[data-notification-center]");
  if (!center) return;

  const apiUrl = center.dataset.apiUrl;
  const trigger = center.querySelector(".notification-trigger");
  const panel = center.querySelector("[data-notification-panel]");
  const badge = center.querySelector("[data-notification-count]");
  const dropdownList = center.querySelector("[data-notification-list]");
  const historyList = document.querySelector("[data-notification-history]");
  let loading = false;

  const csrfToken = () => {
    const cookie = document.cookie.split(";").map((value) => value.trim()).find((value) => value.startsWith("csrftoken="));
    return cookie ? decodeURIComponent(cookie.slice("csrftoken=".length)) : "";
  };

  const formatDate = (value) => {
    if (!value) return "Not available";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Not available" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
  };

  const makeCard = (item) => {
    const article = document.createElement("article");
    article.className = `notification-item${item.is_read ? "" : " unread"}`;

    const link = document.createElement("a");
    link.className = "notification-order";
    link.href = item.order_url;
    link.dataset.notificationOrder = item.id;

    const title = document.createElement("span");
    title.className = "notification-item-title";
    const label = document.createElement("span");
    label.textContent = `${item.title} · Order LM${String(item.order_id).padStart(5, "0")}`;
    const state = document.createElement("span");
    state.className = "notification-state";
    state.textContent = item.is_read ? "Read" : "Unread";
    title.append(label, state);

    const message = document.createElement("p");
    message.className = "notification-message";
    message.textContent = `${item.message} Customer: ${item.customer}.`;
    const details = document.createElement("p");
    details.className = "notification-details";
    details.textContent = `Address: ${item.address} · Assigned: ${formatDate(item.assigned_at || item.created_at)} · Amount: ₹${item.amount}`;
    link.append(title, message, details);
    article.append(link);

    if (!item.is_read) {
      const markRead = document.createElement("button");
      markRead.className = "notification-mark-read";
      markRead.type = "button";
      markRead.dataset.markNotification = item.id;
      markRead.textContent = "Mark as read";
      article.append(markRead);
    }
    return article;
  };

  const renderList = (target, notifications, limit) => {
    if (!target) return;
    target.replaceChildren();
    const visible = notifications.slice(0, limit);
    if (!visible.length) {
      const empty = document.createElement("p");
      empty.className = "notification-empty";
      empty.textContent = "No notifications yet.";
      target.append(empty);
      return;
    }
    visible.forEach((item) => target.append(makeCard(item)));
  };

  const loadNotifications = async () => {
    if (loading) return;
    loading = true;
    try {
      const response = await fetch(apiUrl, { credentials: "same-origin", headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Unable to load notifications");
      const data = await response.json();
      badge.textContent = data.unread_count > 99 ? "99+" : String(data.unread_count);
      badge.hidden = data.unread_count < 1;
      renderList(dropdownList, data.notifications, 8);
      renderList(historyList, data.notifications, data.notifications.length);
    } catch (error) {
      if (dropdownList && !dropdownList.children.length) {
        const message = document.createElement("p");
        message.className = "notification-empty";
        message.textContent = "Notifications are temporarily unavailable.";
        dropdownList.append(message);
      }
    } finally {
      loading = false;
    }
  };

  const updateReadState = async (payload) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken() },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Unable to update notification");
    await loadNotifications();
  };

  trigger.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    trigger.setAttribute("aria-expanded", String(!panel.hidden));
  });

  document.addEventListener("click", async (event) => {
    const markAll = event.target.closest("[data-mark-all-read]");
    if (markAll) {
      event.preventDefault();
      try { await updateReadState({ mark_all: true }); } catch (_) { /* Keep the current state visible when the request fails. */ }
      return;
    }

    const markOne = event.target.closest("[data-mark-notification]");
    if (markOne) {
      event.preventDefault();
      try { await updateReadState({ notification_id: markOne.dataset.markNotification }); } catch (_) { /* Keep the current state visible when the request fails. */ }
      return;
    }

    const orderLink = event.target.closest("[data-notification-order]");
    if (orderLink) {
      event.preventDefault();
      try { await updateReadState({ notification_id: orderLink.dataset.notificationOrder }); } catch (_) { /* Navigation still opens the authorized order page. */ }
      window.location.assign(orderLink.href);
      return;
    }

    if (!center.contains(event.target)) {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  loadNotifications();
  window.setInterval(loadNotifications, 10000);
})();