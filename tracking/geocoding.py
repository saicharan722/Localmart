"""Cached, rate-limited address lookup via the public Nominatim service."""
import hashlib
import json
import threading
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

from .models import GeocodeCache

_lock = threading.Lock()
_last_request = 0.0


def _area_name(result):
    parts = result.get("address", {}) if isinstance(result, dict) else {}
    area = next((parts.get(name) for name in (
        "neighbourhood", "suburb", "quarter", "city_district", "borough", "residential",
        "hamlet", "locality", "district",
    ) if parts.get(name)), "")
    city = next((parts.get(name) for name in (
        "city", "town", "village", "municipality", "city_district", "county", "state_district", "district",
    ) if parts.get(name)), "")
    area = area or str(result.get("name", "")).strip()
    if area and city and city.casefold() != area.casefold():
        value = f"{area}, {city}"
    else:
        value = area or city
    return str(value or "").strip()[:240]


def geocode_address(address):
    query = " ".join(str(address or "").split())
    if len(query) < 8:
        return None
    key = hashlib.sha256(query.casefold().encode("utf-8")).hexdigest()
    cached = GeocodeCache.objects.filter(address_key=key).first()
    if cached and cached.found and cached.area_name:
        return {"latitude": cached.latitude, "longitude": cached.longitude, "address": cached.formatted_address, "area_name": cached.area_name}
    if cached and not cached.found:
        return None
    user_agent = getattr(settings, "NOMINATIM_USER_AGENT", "").strip()
    if not user_agent:
        raise ImproperlyConfigured("Set NOMINATIM_USER_AGENT to an identifying application name and contact.")
    global _last_request
    with _lock:
        delay = 1.05 - (time.monotonic() - _last_request)
        if delay > 0:
            time.sleep(delay)
        url = "https://nominatim.openstreetmap.org/search?" + urlencode({"q": query, "format": "jsonv2", "limit": 1, "addressdetails": 1})
        request = Request(url, headers={"User-Agent": user_agent, "Accept": "application/json"})
        try:
            with urlopen(request, timeout=12) as response:
                results = json.loads(response.read().decode("utf-8"))
        except Exception:
            return None
        _last_request = time.monotonic()
    result = results[0] if results else None
    try:
        latitude, longitude = float(result["lat"]), float(result["lon"])
        if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
            raise ValueError
    except (TypeError, ValueError, KeyError):
        GeocodeCache.objects.update_or_create(address_key=key, defaults={"query": query, "found": False})
        return None
    formatted = str(result.get("display_name", query))[:1000]
    area_name = _area_name(result)
    GeocodeCache.objects.update_or_create(address_key=key, defaults={"query": query, "found": True, "formatted_address": formatted, "area_name": area_name, "latitude": latitude, "longitude": longitude})
    return {"latitude": latitude, "longitude": longitude, "address": formatted, "area_name": area_name}


def reverse_geocode(latitude, longitude):
    """Resolve a user-requested GPS point to a readable place name, with caching."""
    try:
        latitude, longitude = float(latitude), float(longitude)
    except (TypeError, ValueError):
        return None
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        return None
    # Cache by area-scale rounded coordinates; version bumps refresh entries
    # created before locality and city names were both stored.
    query = f"reverse:v5:{latitude:.4f},{longitude:.4f}"
    key = hashlib.sha256(query.encode("utf-8")).hexdigest()
    cached = GeocodeCache.objects.filter(address_key=key).first()
    if cached and cached.found and cached.area_name:
        return {"address": cached.formatted_address, "area_name": cached.area_name, "latitude": cached.latitude, "longitude": cached.longitude, "city": "", "state": "", "postcode": "", "country": ""}
    if cached and not cached.found:
        return None
    user_agent = getattr(settings, "NOMINATIM_USER_AGENT", "").strip()
    if not user_agent:
        raise ImproperlyConfigured("Set NOMINATIM_USER_AGENT to an identifying application name.")
    global _last_request
    with _lock:
        delay = 1.05 - (time.monotonic() - _last_request)
        if delay > 0:
            time.sleep(delay)
        url = "https://nominatim.openstreetmap.org/reverse?" + urlencode({
            "lat": latitude, "lon": longitude, "format": "jsonv2", "zoom": 18, "addressdetails": 1,
        })
        request = Request(url, headers={"User-Agent": user_agent, "Accept": "application/json"})
        try:
            with urlopen(request, timeout=12) as response:
                result = json.loads(response.read().decode("utf-8"))
        except Exception:
            return None
        _last_request = time.monotonic()
    formatted = str(result.get("display_name", "")).strip()[:1000] if isinstance(result, dict) else ""
    if not formatted:
        GeocodeCache.objects.update_or_create(address_key=key, defaults={"query": query, "found": False})
        return None
    area_name = _area_name(result)
    address_parts = result.get("address", {}) if isinstance(result, dict) else {}
    city = next((address_parts.get(name) for name in ("city", "town", "village", "municipality", "county") if address_parts.get(name)), "")
    GeocodeCache.objects.update_or_create(address_key=key, defaults={
        "query": query, "found": True, "formatted_address": formatted,
        "area_name": area_name, "latitude": latitude, "longitude": longitude,
    })
    return {
        "address": formatted,
        "area_name": area_name,
        "latitude": latitude,
        "longitude": longitude,
        "city": str(city or "")[:120],
        "state": str(address_parts.get("state", ""))[:120],
        "postcode": str(address_parts.get("postcode", ""))[:20],
        "country": str(address_parts.get("country", ""))[:100],
    }


def search_places(query, limit=5):
    """Return place suggestions from Photon, whose API supports type-ahead search."""
    query = " ".join(str(query or "").split())[:160]
    if len(query) < 3:
        return []
    user_agent = getattr(settings, "NOMINATIM_USER_AGENT", "").strip() or "LocalMart/1.0"
    api_url = getattr(settings, "LOCATION_SEARCH_API_URL", "https://photon.komoot.io/api/").strip()
    if not api_url:
        return []

    global _last_request
    with _lock:
        delay = 1.05 - (time.monotonic() - _last_request)
        if delay > 0:
            time.sleep(delay)
        url = api_url.rstrip("?") + ("&" if "?" in api_url else "?") + urlencode({"q": query, "limit": min(max(int(limit), 1), 5), "lang": "en"})
        request = Request(url, headers={"User-Agent": user_agent, "Accept": "application/geo+json, application/json"})
        try:
            with urlopen(request, timeout=10) as response:
                data = json.loads(response.read().decode("utf-8"))
        except Exception:
            return []
        finally:
            _last_request = time.monotonic()

    suggestions = []
    for feature in data.get("features", []) if isinstance(data, dict) else []:
        try:
            longitude, latitude = map(float, feature["geometry"]["coordinates"][:2])
            if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
                continue
        except (TypeError, ValueError, KeyError, IndexError):
            continue
        properties = feature.get("properties", {})
        name = str(properties.get("name") or properties.get("street") or "").strip()
        city = str(properties.get("city") or properties.get("locality") or properties.get("district") or properties.get("county") or "").strip()
        state = str(properties.get("state") or "").strip()
        country = str(properties.get("country") or "").strip()
        area_name = name
        if city and city.casefold() != name.casefold():
            area_name = f"{name}, {city}" if name else city
        area_name = area_name or city or name
        address = ", ".join(part for part in (area_name, state, country) if part)
        suggestions.append({
            "latitude": latitude,
            "longitude": longitude,
            "area_name": area_name[:240],
            "city": city[:120],
            "state": state[:120],
            "postcode": str(properties.get("postcode") or "")[:20],
            "country": country[:100],
            "address": address[:1000],
        })
    return suggestions
