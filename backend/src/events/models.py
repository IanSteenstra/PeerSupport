from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Event(models.Model):
    '''
    Model that holds data relating to an event
    '''
    name = models.CharField(max_length=100)
    date = models.DateTimeField(default=now)
    description = models.CharField(max_length=500, blank=True)
    created = models.DateTimeField(auto_now_add=True)
