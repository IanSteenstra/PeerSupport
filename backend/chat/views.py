from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Chat
from .serializers import ChatSerializer


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)


def get_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()


def in_chat(chat, pk):
    return chat.participants.filter(pk=pk).exists()


class ChatViewSet(viewsets.ViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsAdminUser, ]
        elif self.action == 'retrieve':
            self.permission_classes = [AllowAny, ]

        return super(self.__class__, self).get_permissions()

    def list(self, request):
        queryset = Chat.objects.all()
        serializer = ChatSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Chat.objects.all()
        chat = get_object_or_404(queryset, pk=pk)

        if not in_chat(chat, request.user.profile.pk) and not request.user.is_staff:
            return HttpResponseForbidden()

        serializer = ChatSerializer(chat)
        return Response(serializer.data)
