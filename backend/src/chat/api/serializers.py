from rest_framework import serializers

from chat.models import Chat, Message

from Profile.models import Profile
from Profile.serializers import ProfileSerializer


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    content = serializers.CharField(max_length=100)

    class Meta:
        model = Message
        fields = ('username','content','timestamp')

    def create(self, validated_data):
        content = validated_data.pop('content')
        message = Message.objects.create(content=content)
        return message

    def get_username(self, obj):
        if obj.profile:
            return obj.profile.user.username

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)
    participants = ProfileSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'room_name', 'messages', 'participants',)
        read_only = ('id',)

    def create(self, validated_data):
        print(validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat
