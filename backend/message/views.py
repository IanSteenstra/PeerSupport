from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from chat.models import Chat
from .models import Message, MessageFlag
from .serializers import MessageFlagSerializer


class MessageFlagViewSet(viewsets.ViewSet):
    serializer_class = MessageFlagSerializer
    queryset = MessageFlag.objects.all()

    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsAdminUser, ]
        elif self.action == 'retrieve':
            self.permission_classes = [AllowAny, ]
        elif self.action == 'create':
            self.permission_classes = [AllowAny, ]

        return super(self.__class__, self).get_permissions()

    def list(self, request):
        queryset = MessageFlag.objects.all()
        serializer = MessageFlagSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = MessageFlag.objects.all()
        flag = get_object_or_404(queryset, pk=pk)

        if not in_chat(flag.chat, request.user.profile.pk) and not request.user.is_staff:
            return HttpResponseForbidden()

        serializer = MessageFlagSerializer(flag)
        return Response(serializer.data)

    def create(self, request):
        queryset = MessageFlag.objects.all()
        flag = request.data['flag']
        chat = Chat.objects.get(pk=request.data['chat'])

        m = MessageFlag.objects.create(flag=flag, chat=chat)
        m.message.add(Message.objects.get(pk=request.data['message']))
        serializer = MessageFlagSerializer(m)

        return Response(serializer.data)
