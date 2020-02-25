from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    description = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
