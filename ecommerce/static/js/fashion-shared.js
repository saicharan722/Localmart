(() => {
  const apiNode = document.getElementById("fashionShoppingApi");
  const apiUrl = apiNode?.dataset.url || "/fashion/shopping/api/";
  const csrf = document.querySelector("#fashionCsrfForm [name=csrfmiddlewaretoken]")?.value || "";
  const setCounts = (data) => {
    const cart = Number(data.cart_count ?? data.count ?? 0);
    const wishlist = Number(data.wishlist_count ?? data.count ?? 0);
    ["navbarCartCount", "navbarWishlistCount", "watchBagCount", "watchWishlistCount", "shoeBagCount", "shoeWishlistCount"].forEach((id) => {
      const node = document.getElementById(id); if (!node) return;
      node.textContent = id.toLowerCase().includes("wishlist") ? wishlist : cart;
    });
  };
  const send = async (payload) => {
    const response = await fetch(apiUrl, {method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json","X-CSRFToken":csrf,"X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(payload)});
    const data = await response.json(); if (!response.ok || !data.ok) throw new Error(data.error || "Unable to update your shopping bag.");
    setCounts(data); return data;
  };
  let writeQueue = Promise.resolve();
  let pendingWrites = 0;
  window.localmartFashionSync = (action, catalog, product, extra = {}) => {
    const pending = writeQueue.then(() => send({action,catalog,product,...extra}));
    pendingWrites += 1;
    writeQueue = pending.catch((error) => { console.error("Fashion sync failed:", error); }).finally(() => { pendingWrites -= 1; });
    return pending;
  };
  document.addEventListener("click", (event) => {
    const link = event.target.closest(".shared-fashion-actions a");
    if (!link || pendingWrites === 0) return;
    const destination = link.href;
    event.preventDefault();
    writeQueue.finally(() => window.location.assign(destination));
  });
  window.localmartFashionRefreshCounts = async () => {
    try { const response = await fetch(apiUrl,{credentials:"same-origin",headers:{"X-Requested-With":"XMLHttpRequest"}}); if(response.ok) setCounts(await response.json()); } catch (_) {}
  };
  window.localmartFashionRefreshCounts();
})();
