from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from Profile.views import ProfileViewSet, token_to_username, username_to_pk
from events.views import EventViewSet
from chat.api.views import room

router = routers.DefaultRouter()
router.register('profiles', ProfileViewSet)
router.register('events', EventViewSet, 'events')

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/chats/', include('chat.api.urls', namespace='chat')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/username/', token_to_username),
    path('api/user-pk/', username_to_pk),
    path('<int:pk>/', room, name='room'),
]
