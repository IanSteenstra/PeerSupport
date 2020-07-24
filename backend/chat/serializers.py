from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Chat
from Profile.models import Profile
from Profile.serializers import ProfileSerializer

User = get_user_model()


class ChatSerializer(serializers.ModelSerializer):
    participants = ProfileSerializer(many=True, required=False)

    def create(self, validated_data):
        chat = Chat.objects.create()
        usernames = (self.context['request'].data)['usernames']
        if not usernames:
            usernames = []

        for user in usernames:
            profile = Profile.objects.get(user=User.objects.get(username=user))
            chat.participants.add(profile)
            profile.chat_rooms.add(chat)
            profile.save()
        chat.save()
        return chat

    class Meta:
        model = Chat
        fields = ('pk', 'messages', 'participants',)
        read_only = ('pk',)
