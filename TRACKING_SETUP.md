# LocalMart live order tracking

The tracking flow uses Leaflet, OpenStreetMap tiles, Nominatim address lookup, OSRM road routing, browser GPS, Django REST Framework, and Channels. It does not use Google Maps. The official route destination is a separately confirmed delivery pin; optional customer GPS is stored and shown separately.

## Install and migrate

From the project root in PowerShell:

```powershell
python -m pip install -r tracking-requirements.txt
python manage.py makemigrations store merchants tracking
python manage.py migrate
python manage.py check
python manage.py runserver
```

`tracking-requirements.txt` installs Channels/Daphne and Redis channel support. Local single-process development uses the in-memory channel layer. For multiple ASGI workers, run Redis and set `REDIS_URL=redis://127.0.0.1:6379/0`, then start the ASGI app:

```powershell
daphne -b 0.0.0.0 -p 8000 ecommerce.asgi:application
```

If Channels is unavailable, the authenticated tracking page falls back to polling.

## Geocoding configuration and provider policy

Set an identifying user agent in the project `.env`; include a real monitored contact:

```dotenv
NOMINATIM_USER_AGENT=LocalMart/1.0 (contact: ops@your-domain.example)
```

Restart Django after changing `.env`. The application caches address lookup results in `tracking.GeocodeCache`. A saved customer delivery address is looked up once; its result is only a candidate until the customer reviews and confirms the map pin. A merchant address is looked up through Merchant Dashboard → Settings, then the merchant must click the exact store point on the map and confirm it. If lookup fails, the user can select the exact point manually on the map. There is no city-center fallback.

The public Nominatim service has a strict maximum of one request per second, requires an identifying User-Agent, and expects attribution. This implementation caches results and spaces uncached requests in each application process. For production or multiple workers, use a geocoding provider or a controlled Nominatim deployment with a shared rate limiter; do not direct high-volume traffic to the public service. See the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/) and [Search API](https://nominatim.org/release-docs/5.0/api/Search/).

## Accurate location flow

1. Checkout saves the customer's delivery address and requires a confirmed map pin before Razorpay payment. Both `customer_latitude`/`customer_longitude` and the dedicated `delivery_latitude`/`delivery_longitude` fields store that destination.
2. The pin starts from a cached address lookup. The customer checks the actual building/entrance, can drag or click to adjust it, and confirms before paying. There is no guessed city-center fallback.
4. Customer device GPS is an independent optional marker. GPS updates do not change the delivery address or route destination. The customer can explicitly select their GPS as a new delivery pin and confirm the change.
5. Approved merchant addresses are geocoded, but merchant coordinates are not routed until the merchant confirms their exact store pin in Settings.
6. OSRM route geometry, road distance, and duration are requested only when both confirmed endpoints exist. After pickup, the start point changes to the courier's received GPS. The route is refreshed after meaningful movement and throttled.

Food menu items preserve their selected restaurant name in the cart. Checkout resolves that name to exactly one approved `MerchantProfile` and stores the relationship on the existing `Order`. Merchants should use the same registered restaurant name as the selected food listing, enter the real branch address, and confirm that branch's exact map pin in Dashboard Settings. The food catalog itself is static; when no matching approved merchant profile exists, LocalMart keeps the selected restaurant name and does not substitute another store or draw a false route. For non-food carts with no selected restaurant, the legacy single-approved-merchant fallback remains. A route is shown only when both restaurant and delivery pins are confirmed.

## Delivery partner setup and statuses

Create a Django user for each courier and add a Delivery Partner profile in Django Admin. The courier signs in, opens `/delivery/`, goes online, accepts an assignment, and grants GPS access. The browser sends actual device coordinates, accuracy, speed, and capture timestamp. Django checks the assigned partner, coordinate ranges, and timestamp before saving/broadcasting. Status includes Order Placed, Confirmed, Preparing, Delivery Partner Assigned, Partner Reached Restaurant, Picked Up, Out for Delivery, Arriving Soon, and Delivered. Completing/cancelling releases the partner.

## Map services

Leaflet and OpenStreetMap tiles are loaded in the browser. OSM contributor attribution is displayed on-map. OSRM returns actual driving-road geometry and route metrics; the frontend draws the returned geometry as a polyline. These public tile and demo routing services are shared community services with no uptime/capacity promise. Follow the [OSM tile policy](https://operations.osmfoundation.org/policies/tiles/) and use a suitable provider plus contracted/self-hosted routing for production.

## Routes and access

- Customer tracking page: `/order/<order_id>/track/`
- WebSocket: `/ws/order/<order_id>/tracking/`
- Confirm delivery pin: `POST /api/orders/<order_id>/confirm-location/`
- Get tracking state: `GET /api/orders/<order_id>/tracking/`
- Optional customer current GPS: `POST /api/orders/<order_id>/tracking/customer-location/`
- Partner GPS: `POST /api/delivery/location/update/`
- Order status: `/api/orders/<order_id>/status/`

Customer mutation endpoints verify order ownership (or matching email for legacy guest orders); partner location updates are bound to the authenticated assigned partner. Apply migrations with `python manage.py migrate` after pulling model changes. OSM map tiles/routes/geocoding do not need a Google key.
