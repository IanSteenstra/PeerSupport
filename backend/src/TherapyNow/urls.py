from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from Profile.views import ProfileViewSet, UserQuizViewSet, CounselorQuizViewSet

router = routers.DefaultRouter()
router.register('profile', ProfileViewSet)
router.register('userquiz', UserQuizViewSet)
router.register('counselorquiz', CounselorQuizViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('chat/', include('chat.api.urls', namespace='chat')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('model/', views.match.as_view())
]

