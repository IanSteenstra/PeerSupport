from django.contrib import admin
from .models import Message, MessageFlag

admin.site.register(Message)
admin.site.register(MessageFlag)
