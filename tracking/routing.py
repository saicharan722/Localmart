from django.urls import path
from .consumers import OrderTrackingConsumer

websocket_urlpatterns = [
    path("ws/order/<int:order_id>/tracking/", OrderTrackingConsumer.as_asgi()),
    path("ws/orders/<int:order_id>/tracking/", OrderTrackingConsumer.as_asgi()),
]
