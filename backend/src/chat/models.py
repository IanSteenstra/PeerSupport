from django.contrib.auth import get_user_model
from django.db import models
from Profile.models import Profile
from django.core.exceptions import ObjectDoesNotExist
from events.models import Event

User = get_user_model()


class Message(models.Model):
    sender = models.ForeignKey(
        Profile, related_name='sender', on_delete=models.CASCADE, null=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content


class Chat(models.Model):
    participants = models.ManyToManyField(
        Profile, related_name='participants', blank=True)
    messages = models.ManyToManyField(Message, blank=True)
    room_name = models.CharField(
        blank=False, unique=True, null=True, max_length=16)
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='event', blank=True, null=True)

    def get_or_create(**kwargs):
        try:
            c = Chat.objects.get(**kwargs)
        except ObjectDoesNotExist:
            c = Chat.objects.create(**kwargs)
        return c

    def __str__(self):
        return str(self.pk)
