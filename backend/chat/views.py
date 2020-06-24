from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseForbidden

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny

from .models import Message, Chat, MessageFlag
from .serializers import ChatSerializer, MessageFlagSerializer
from Profile.models import Profile

User = get_user_model()


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]

def get_user_profile(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Profile, user=user)

def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)

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


