from django.contrib import admin
from chat.models import Chat
from .models import Event

class ChatInline(admin.TabularInline):
    model = Chat
    extra = 0

class EventAdmin(admin.ModelAdmin):
    model = Event
    list_display = ['name', 'start_time', 'end_time', 'description']
    fields = ['name', 'start_time', 'end_time', 'description', 'users']
    inlines = [
        ChatInline,
    ]

admin.site.register(Event, EventAdmin)
