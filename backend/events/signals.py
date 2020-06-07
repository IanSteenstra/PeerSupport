from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Event
from chat.models import Chat


# @receiver(post_save, sender=Chat)
# def update_event_users(sender, instance, created, **kwargs):
#     if created:
