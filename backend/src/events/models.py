from django.db import models
from django.utils.timezone import now


class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField(default=now)
    description = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
