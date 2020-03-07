from rest_framework import serializers
from django.http import HttpResponse

from chat.models import Chat, Message

from Profile.models import Profile
from Profile.serializers import ProfileSerializer, ProfileUsernameSerializer


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    content = serializers.CharField(max_length=100)

    def create(self, validated_data):
        content = validated_data.pop('content')
        message = Message.objects.create(content=content)
        return message

    def get_username(self, obj):
        if obj.sender:
            return obj.sender.user.username

    class Meta:
        model = Message
        fields = ('pk', 'username','content','timestamp')


class ChatSerializer(serializers.ModelSerializer):
    participants = ProfileSerializer(many=True, required=False)
    messages = MessageSerializer(many=True, required=False)

    def create(self, validated_data):
        chat = Chat.objects.create()
        profilepks = self.context.get("profilepks")
        if not profilepks:
            profilepks = []

        for pk in profilepks:
            profile = Profile.objects.get(pk=pk)
            chat.participants.add(profile)
            profile.chat_rooms.add(chat)
            profile.save()
        chat.save()
        return chat

    class Meta:
        model = Chat
        fields = ('pk', 'messages', 'participants',)
        read_only = ('pk',)