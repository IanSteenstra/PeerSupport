from channels.routing import ProtocolTypeRouter, URLRouter, AsgiHandler
from channels.auth import AuthMiddlewareStack
import chat.api.routing

application = ProtocolTypeRouter({
    # WebSocket chat handler
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.api.routing.websocket_urlpatterns
        )
    ),
})
