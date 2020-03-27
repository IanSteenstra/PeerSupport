from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
import json

from chat.models import Chat, Message
from Profile.models import Profile


User = get_user_model()


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        self.profile = Profile.objects.get(pk=self.user.profile.pk)
        self.room_pk = self.scope['url_route']['kwargs']['pk']
        self.room_group_pk = 'chat_%s' % self.room_pk

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_pk,
            self.channel_name
        )

        # Load or create chat object
        c = Chat.get_or_create(pk=self.room_pk)

        c.participants.add(self.profile)
        self.profile.chat_rooms.add(c)
        self.profile.save()
        c.save()

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_pk,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_pk,
            {
                'type': 'chat_message',
                'sender': self.profile.user.username,
                'message': message,
            }
        )

        m = Message.objects.create(sender=self.profile, content=message)
        c = Chat.objects.get(pk=self.room_pk)
        c.messages.add(m)

    # Receive message from room group
    def chat_message(self, event):
        sender = event['sender']
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'sender': sender,
            'message': message,
        }))
