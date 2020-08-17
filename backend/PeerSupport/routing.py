from channels.routing import ProtocolTypeRouter, URLRouter, AsgiHandler
from channels.auth import AuthMiddlewareStack
import chat.routing

application = ProtocolTypeRouter({
    # WebSocket chat handler
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})
