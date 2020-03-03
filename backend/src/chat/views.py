from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from .models import Chat

User = get_user_model()


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)
