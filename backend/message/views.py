from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from Profile.models import Profile
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
            self.permission_classes = [IsAdminUser, ]
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
        serializer = MessageFlagSerializer(flag)
        return Response(serializer.data)

    def delete(self, request, pk=None):
        queryset = MessageFlag.objects.all()
        flag = get_object_or_404(queryset, pk=pk)
        serializer = MessageFlagSerializer(flag)

        flag.delete()
        return Response(serializer.data)

    def create(self, request):
        flag_id = request.data['flag_type']
        if flag_id == 1:
            flag_type = "Suicidal"
        elif flag_id == 2:
            flag_type = 'Violent'
        elif flag_id == 3:
            flag_type = "Harassment"

        content = request.data['content']
        flagged_user_username = request.data['flagged_user']

        flagged_user = User.objects.get(username=flagged_user_username)
        flagged_profile = Profile.objects.get(user=flagged_user)

        m = MessageFlag.objects.create(
            flag_type=flag_type, content=content, flagged_user=flagged_profile)
        serializer = MessageFlagSerializer(m)

        return Response(serializer.data)
