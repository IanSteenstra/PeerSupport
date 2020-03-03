from django.conf.urls import url
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    url(r'ws/chat/(?P<pk>\w+)/$', consumers.ChatConsumer),
]