from django.db import models
from Profile.models import Profile


class Message(models.Model):
    sender = models.ForeignKey(
        Profile, related_name='sender', on_delete=models.CASCADE, null=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pk)


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
    receiver = models.ForeignKey(
        Profile, related_name='receiver', on_delete=models.CASCADE, null=True)
