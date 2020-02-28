from rest_framework import serializers
from django.http import HttpResponse

from chat.models import Chat, Message

from Profile.models import Profile
from Profile.serializers import ProfileSerializer, ProfileUsernameSerializer
from Profile.views import get_profile


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    content = serializers.CharField(max_length=100)

    def create(self, validated_data):
        content = validated_data.pop('content')
        message = Message.objects.create(content=content)
        return message

    def get_username(self, obj):
        if obj.profile:
            return obj.profile.user.username

    class Meta:
        model = Message
        fields = ('username','content','timestamp')


class ChatSerializer(serializers.ModelSerializer):
    participants = ProfileSerializer(many=True, required=False)

    def create(self, validated_data):
        room_name = validated_data.pop('room_name')
        chat = Chat.objects.create(room_name=room_name)
        usernames = self.context.get("usernames")

        for u in usernames:
            profile = get_profile(u)
            chat.participants.add(profile)
            profile.chat_rooms.add(chat)
            profile.save()
        chat.save()
        return chat


    class Meta:
        model = Chat
        fields = ('id', 'room_name', 'messages', 'participants',)
        read_only = ('id',)