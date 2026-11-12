from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .models import TrackingSession
from .services import serialize_tracking


@database_sync_to_async
def _authorized_snapshot(user, order_id):
    if not user.is_authenticated:
        return None
    session = TrackingSession.objects.select_related("order", "partner", "partner__user", "merchant").filter(order_id=order_id).first()
    if not session:
        return None
    is_customer = session.order.customer_user_id == user.id or (session.order.customer_user_id is None and session.customer_email.lower() == (user.email or "").lower())
    is_partner = bool(session.partner_id and session.partner.user_id == user.id)
    is_merchant = bool(session.merchant_id and session.merchant.owner_id == user.id)
    if is_customer or is_partner or is_merchant or user.is_staff:
        return serialize_tracking(session)
    return None


class OrderTrackingConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.order_id = self.scope["url_route"]["kwargs"]["order_id"]
        snapshot = await _authorized_snapshot(self.scope["user"], self.order_id)
        if snapshot is None:
            await self.close(code=4403)
            return
        self.group_name = f"order_tracking_{self.order_id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        await self.send_json(snapshot)

    async def disconnect(self, close_code):
        if hasattr(self, "group_name"):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def tracking_update(self, event):
        await self.send_json(event["data"])
