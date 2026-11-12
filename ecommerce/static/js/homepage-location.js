(() => {
  const control = document.getElementById("homeLocationControl");
  const trigger = document.getElementById("homeLocationTrigger");
  const panel = document.getElementById("homeLocationPanel");
  const label = document.getElementById("homeLocationLabel");
  const message = document.getElementById("homeLocationMessage");
  const gpsButton = document.getElementById("homeUseGps");
  const addressInput = document.getElementById("homeAddressInput");
  const addressButton = document.getElementById("homeAddressSearch");
  const suggestionsBox = document.getElementById("homeLocationSuggestions");
  const recentBox = document.getElementById("homeRecentLocation");
  const recentButton = document.getElementById("homeRecentLocationButton");
  if (!control || !trigger || !panel || !label || !message) return;

  const STORAGE_KEY = "localmart.homeLocation";
  const csrf = () => document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("csrftoken="))?.slice(10) || "";
  let savedLocation = null;
  let detecting = false;
  let requestId = 0;
  let searchTimer = null;
  let searchController = null;

  const setMessage = (text, isError = false) => {
    message.textContent = text || "";
    message.classList.toggle("text-danger", isError);
  };
  const setPanelOpen = (open) => {
    panel.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
  };
  const setLoading = (loading) => {
    detecting = loading;
    trigger.classList.toggle("is-loading", loading);
    if (gpsButton) {
      gpsButton.disabled = loading;
      gpsButton.innerHTML = loading
        ? '<i class="bi bi-arrow-repeat" aria-hidden="true"></i> Detecting current location…'
        : '<i class="bi bi-crosshair" aria-hidden="true"></i> Use current location';
    }
    if (loading) label.textContent = "Detecting current location…";
  };
  const labelFor = (location) => location.displayName || location.areaName || location.city || "Address unavailable";
  const validCoordinates = (latitude, longitude) => Number.isFinite(Number(latitude)) && Number(latitude) >= -90 && Number(latitude) <= 90
    && Number.isFinite(Number(longitude)) && Number(longitude) >= -180 && Number(longitude) <= 180;

  const saveLocation = (location) => {
    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);
    if (!validCoordinates(latitude, longitude)) throw new Error("The selected place did not include valid coordinates.");
    const areaName = String(location.areaName || location.area_name || "").trim();
    const city = String(location.city || "").trim();
    const normalized = {
      latitude,
      longitude,
      accuracy: location.accuracy !== null && location.accuracy !== undefined && Number.isFinite(Number(location.accuracy))
        ? Number(location.accuracy) : null,
      address: String(location.address || "").trim(),
      areaName,
      city,
      state: String(location.state || "").trim(),
      postcode: String(location.postcode || "").trim(),
      country: String(location.country || "").trim(),
      source: location.source === "address" ? "address" : "gps",
      timestamp: Date.now(),
    };
    normalized.displayName = String(location.displayName || "").trim() || areaName || city || "Address unavailable";
    savedLocation = normalized;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized)); }
    catch (_) { /* Location remains available for this page session. */ }
    label.textContent = labelFor(normalized);
    window.localmartLocation = normalized;
    window.dispatchEvent(new CustomEvent("localmart:location-updated", {detail: normalized}));
    renderRecentLocation();
    return normalized;
  };

  const saveToSession = async (location) => {
    try {
      const response = await fetch("/api/location/update/", {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-CSRFToken": csrf(), "Accept": "application/json"},
        body: JSON.stringify(location),
        credentials: "same-origin",
      });
      return response.ok;
    } catch (_) {
      return false;
    }
  };

  const reverseGeocode = async (latitude, longitude, signal) => {
    const response = await fetch("/api/geocode/reverse/", {
      method: "POST",
      headers: {"Content-Type": "application/json", "X-CSRFToken": csrf(), "Accept": "application/json"},
      body: JSON.stringify({latitude, longitude}),
      credentials: "same-origin",
      signal,
    });
    const data = await response.json();
    if (!response.ok || !data.location) throw new Error(data.error || "Reverse geocoding failed.");
    const place = data.location;
    return {
      address: place.address || "",
      areaName: place.area_name || "",
      city: place.city || "",
      state: place.state || "",
      postcode: place.postcode || "",
      country: place.country || "",
    };
  };

  const handleLocationError = (error) => {
    setLoading(false);
    const unsupported = !navigator.geolocation;
    const insecure = !window.isSecureContext;
    let title = "Unable to detect location";
    let detail = "Check your device location settings and try again.";
    let buttonText = "Try again";
    if (error?.code === 1) {
      title = "Location permission denied";
      detail = "Allow location access for LocalMart in your browser settings, then try again.";
      buttonText = "Enable location";
    } else if (error?.code === 3) {
      title = "Location detection timed out";
      detail = "Your device did not return a GPS position in time. Try again.";
    } else if (unsupported) {
      detail = "This browser does not support device location. Search for an area or city instead.";
    } else if (insecure) {
      detail = "Device location requires HTTPS, or localhost during development.";
    }
    label.textContent = title;
    setMessage(detail, true);
    if (gpsButton) gpsButton.innerHTML = `<i class="bi bi-arrow-clockwise" aria-hidden="true"></i> ${buttonText}`;
  };

  const closeOnSuccessIfRequested = (shouldClose) => {
    if (shouldClose) setPanelOpen(false);
  };

  const detectCurrentLocation = (options = {}) => {
    if (detecting) return;
    if (!navigator.geolocation || !window.isSecureContext) {
      handleLocationError(null);
      return;
    }
    const thisRequest = ++requestId;
    setLoading(true);
    setMessage("Requesting permission to use your device location…");
    if (window.LOCALMART_DEBUG_LOCATION) console.info("Requesting current GPS location…");
    navigator.geolocation.getCurrentPosition(async (position) => {
      if (thisRequest !== requestId) return;
      const {latitude, longitude, accuracy} = position.coords;
      if (window.LOCALMART_DEBUG_LOCATION) {
        console.info("GPS coordinates:", latitude, longitude);
        console.info("GPS accuracy:", accuracy);
        console.info("Reverse geocoding current GPS fix…");
      }
      let place = null;
      try {
        place = await reverseGeocode(latitude, longitude);
      } catch (error) {
        if (window.LOCALMART_DEBUG_LOCATION) console.warn("Reverse geocoding failed:", error);
      }
      if (thisRequest !== requestId) return;
      try {
        const location = saveLocation({
          latitude, longitude, accuracy, ...(place || {}), source: "gps",
          displayName: place?.areaName || place?.city || "Address unavailable",
        });
        await saveToSession(location);
        if (place && (place.areaName || place.city)) {
          const details = [place.address || place.areaName || place.city, place.state, place.country].filter(Boolean).join(", ");
          setMessage(details);
          if (window.LOCALMART_DEBUG_LOCATION) console.info("Final location:", location.displayName);
        } else {
          setMessage("GPS was detected, but its address could not be looked up. Try again or search for a place.", true);
        }
        setLoading(false);
        closeOnSuccessIfRequested(options.closeOnSuccess);
      } catch (error) {
        handleLocationError({code: 2, message: error.message});
      }
    }, (error) => {
      if (thisRequest === requestId) handleLocationError(error);
    }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 0});
  };

  const renderRecentLocation = () => {
    if (!recentBox || !recentButton || !savedLocation) return;
    recentBox.hidden = false;
    recentButton.replaceChildren();
    const title = document.createElement("strong");
    title.textContent = labelFor(savedLocation);
    const detail = document.createElement("small");
    detail.textContent = [savedLocation.city, savedLocation.state, savedLocation.country].filter(Boolean).join(", ") || (savedLocation.source === "address" ? "Selected location" : "Last detected location");
    recentButton.append(title, detail);
  };

  const setSuggestionsMessage = (text) => {
    if (!suggestionsBox) return;
    suggestionsBox.replaceChildren();
    suggestionsBox.hidden = !text;
    if (text) {
      const note = document.createElement("small");
      note.textContent = text;
      note.className = "text-muted px-2 py-1";
      suggestionsBox.append(note);
    }
  };

  const selectLocation = async (candidate) => {
    try {
      const location = saveLocation({...candidate, source: "address", accuracy: null});
      await saveToSession(location);
      setMessage(location.address || [location.city, location.state, location.country].filter(Boolean).join(", ") || "Selected location saved.");
      if (addressInput) addressInput.value = location.displayName;
      setSuggestionsMessage("");
      setPanelOpen(false);
    } catch (error) {
      setMessage(error.message || "That location could not be selected.", true);
    }
  };

  const showSuggestions = (results) => {
    if (!suggestionsBox) return;
    suggestionsBox.replaceChildren();
    if (!results.length) {
      setSuggestionsMessage("No matching places found. Try adding a city or state.");
      return;
    }
    suggestionsBox.hidden = false;
    results.forEach((candidate) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "home-location-suggestion";
      option.setAttribute("role", "option");
      const title = document.createElement("strong");
      title.textContent = candidate.areaName || candidate.city || "Selected place";
      const detail = document.createElement("small");
      detail.textContent = [candidate.city, candidate.state, candidate.country].filter(Boolean).join(", ") || candidate.address;
      option.append(title, detail);
      option.addEventListener("click", () => selectLocation(candidate));
      suggestionsBox.append(option);
    });
  };

  const searchPlaces = async ({allowSingleResultFallback = false} = {}) => {
    const query = addressInput?.value.trim() || "";
    if (query.length < 3) {
      setSuggestionsMessage("Enter at least 3 characters to search.");
      return;
    }
    searchController?.abort();
    searchController = new AbortController();
    const controller = searchController;
    if (addressButton) addressButton.disabled = true;
    setSuggestionsMessage("Searching places…");
    setMessage("");
    if (window.LOCALMART_DEBUG_LOCATION) console.info("Searching place suggestions…");
    try {
      const response = await fetch("/api/geocode/suggest/", {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-CSRFToken": csrf(), "Accept": "application/json"},
        body: JSON.stringify({query}),
        credentials: "same-origin",
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Location search is temporarily unavailable.");
      if (data.suggestions?.length) {
        showSuggestions(data.suggestions);
      } else if (allowSingleResultFallback) {
        await searchSingleAddress(query, controller.signal);
      } else {
        setSuggestionsMessage("No matching places found. Try adding a city or state.");
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      if (allowSingleResultFallback) {
        try { await searchSingleAddress(query, controller.signal); }
        catch (fallbackError) { setSuggestionsMessage(fallbackError.message || "Search is temporarily unavailable. Try again."); }
      } else {
        setSuggestionsMessage(error.message || "Location search is temporarily unavailable.");
      }
    } finally {
      if (searchController === controller && addressButton) addressButton.disabled = false;
    }
  };

  const searchSingleAddress = async (query, signal) => {
    if (query.length < 8) {
      setSuggestionsMessage("No suggestions yet. Add more detail, then press Search.");
      return;
    }
    const response = await fetch("/api/geocode/address/", {
      method: "POST",
      headers: {"Content-Type": "application/json", "X-CSRFToken": csrf(), "Accept": "application/json"},
      body: JSON.stringify({address: query}),
      credentials: "same-origin",
      signal,
    });
    const data = await response.json();
    if (!response.ok || !data.candidate) throw new Error(data.error || "Could not find this location. Add a city or area and try again.");
    const candidate = data.candidate;
    showSuggestions([{
      latitude: candidate.latitude,
      longitude: candidate.longitude,
      address: candidate.address || query,
      areaName: candidate.area_name || query,
      city: candidate.city || "",
      state: candidate.state || "",
      postcode: candidate.postcode || "",
      country: candidate.country || "",
    }]);
  };

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (stored && validCoordinates(stored.latitude, stored.longitude)) {
      savedLocation = {...stored, source: stored.source === "address" ? "address" : "gps"};
      window.localmartLocation = savedLocation;
      label.textContent = labelFor(savedLocation);
      setMessage(savedLocation.address || [savedLocation.city, savedLocation.state, savedLocation.country].filter(Boolean).join(", "));
      renderRecentLocation();
    }
  } catch (_) {
    // Invalid or unavailable local storage must never block a fresh GPS attempt.
  }

  trigger.addEventListener("click", () => {
    const open = panel.hidden;
    setPanelOpen(open);
    if (!open) return;
    addressInput?.focus();
    // Keep an explicitly selected address stable. A fresh GPS fix is available via the button.
    if (savedLocation?.source !== "address" && !detecting) detectCurrentLocation();
  });
  document.addEventListener("click", (event) => {
    if (!panel.hidden && !event.target.closest("#homeLocationControl")) setPanelOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setPanelOpen(false);
  });
  gpsButton?.addEventListener("click", () => detectCurrentLocation({closeOnSuccess: true}));
  recentButton?.addEventListener("click", () => savedLocation && selectLocation(savedLocation));
  addressInput?.addEventListener("input", () => {
    window.clearTimeout(searchTimer);
    searchController?.abort();
    const query = addressInput.value.trim();
    if (query.length < 3) {
      setSuggestionsMessage(query ? "Enter at least 3 characters to search." : "");
      return;
    }
    searchTimer = window.setTimeout(() => searchPlaces(), 450);
  });
  addressButton?.addEventListener("click", () => searchPlaces({allowSingleResultFallback: true}));
  addressInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      window.clearTimeout(searchTimer);
      searchPlaces({allowSingleResultFallback: true});
    }
  });

  if (savedLocation?.source === "address") {
    label.textContent = labelFor(savedLocation);
    setMessage("Using your selected location. Choose Use current location to switch to fresh GPS.");
  } else {
    label.textContent = "Detecting current location…";
    detectCurrentLocation();
  }
})();
