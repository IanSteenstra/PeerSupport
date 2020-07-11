from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from allauth.account.views import ConfirmEmailView
from rest_framework.authtoken.views import obtain_auth_token
from Profile.views import null_view, complete_view, ProfileViewSet, PreStudyQuizViewSet, UserQuizViewSet, CounselorQuizViewSet, ResearchQuizViewSet, get_chats, get_friends
from events.views import EventViewSet
from chat.api.views import room

router = routers.DefaultRouter()
router.register('profiles', ProfileViewSet)
router.register('events', EventViewSet)
router.register('prestudyquiz', PreStudyQuizViewSet)

urlpatterns = [
    path('api-token-auth/', obtain_auth_token),
    path('api/chats/', include('chat.api.urls', namespace='chat')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('<int:pk>/', room, name='room'),
    path('get-chats/', get_chats),
    path('get-friends/', get_friends),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/account-email-verification-sent/',
         null_view, name='account_email_verification_sent'),
    path('rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$',
         ConfirmEmailView.as_view(), name='account_confirm_email'),
    path('rest-auth/registration/complete/$',
         complete_view, name='account_confirm_complete'),
    path(
        'rest-auth/password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', null_view, name='password_reset_confirm'),
]
