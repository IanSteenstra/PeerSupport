from django.contrib.auth import get_user_model
from django.db import models
from Profile.models import Profile
from events.models import Event
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()


class Message(models.Model):
    sender = models.ForeignKey(
        Profile, related_name='sender', on_delete=models.CASCADE, null=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return str(self.pk)



class Chat(models.Model):
    participants = models.ManyToManyField(
        Profile, related_name='participants', blank=True)
    messages = models.ManyToManyField(Message, blank=True)
    event = models.ForeignKey(Event, blank=True, null=True, related_name='event', on_delete=models.CASCADE)

    def get_or_create(**kwargs):
        try:
            c = Chat.objects.get(**kwargs)
        except ObjectDoesNotExist:
            c = Chat.objects.create(**kwargs)
        return c

    def __str__(self):
        return str(self.pk)

# class ChatQueue(models.Model):
#     chatQ = models.ManyToManyField(pk, score)

class MessageFlag(models.Model):
  flag_suicidal = 'Suicidal'
  flag_violent = 'Violent'
  flag_harassment = 'Harassment'
  flags = [
    (flag_suicidal, 'Suicidal Ideation'),
    (flag_violent, 'Potential Violence'),
    (flag_harassment, 'Harassment')
  ]

  flag = models.CharField(choices=flags, max_length=32)
  message = models.ManyToManyField(Message, related_name='message')
  chat = models.ForeignKey(Chat, related_name='chat', on_delete=models.CASCADE)


