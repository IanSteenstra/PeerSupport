from django.urls import path, re_path
from . import views

from .views import (
    ChatListView,
    ChatDetailView,
    ChatCreateView,
    ChatUpdateView,
    ChatDeleteView,
)

app_name = 'chat'

urlpatterns = [
    path('', ChatListView.as_view()),
    path('create/', ChatCreateView.as_view()),
    path('<int:pk>', ChatDetailView.as_view()),
    path('<int:pk>/update/', ChatUpdateView.as_view()),
    path('<int:pk>/delete/', ChatDeleteView.as_view()),

    path('<int:pk>/', views.room, name='room'),

]
