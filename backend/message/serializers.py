from rest_framework import serializers
from .models import Message, MessageFlag


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
        fields = ('pk', 'username', 'content', 'timestamp')
        read_only = ('pk',)


class MessageFlagSerializer(serializers.ModelSerializer):

    class Meta:
        model = MessageFlag
        fields = ('flag', 'chat', 'message')
        read_only = ('pk',)
