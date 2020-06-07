from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from Profile.views import ProfileViewSet, get_chats, get_friends
from events.views import EventViewSet
from chat.api.views import room

router = routers.DefaultRouter()
router.register('profiles', ProfileViewSet)
router.register('events', EventViewSet, 'events')

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/chats/', include('chat.api.urls', namespace='chat')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('<int:pk>/', room, name='room'),
    path('get-chats/', get_chats),
    path('get-friends/', get_friends),
]

