from django.contrib import admin
from .models import Event
from chat.models import Chat

# A TabularInline allows for an object reference (with a Foreign Key to the main object) to be displayed 
# within the admin backend under the main object
# Django TabularInline: https://docs.djangoproject.com/en/3.0/ref/contrib/admin/#django.contrib.admin.TabularInline
class ChatInline(admin.TabularInline):
    model = Chat
    # extra: This flag allows for no additional chats to be displayed other than those connected to the event 
    # (Default is 3 additional objects not necessarily connected to the particular event. However, we want 0)
    extra = 0

# A ModelAdmin allows you to configure the display of a model in the admin backend
# Django ModelAdmin: https://docs.djangoproject.com/en/3.0/ref/contrib/admin/
class EventAdmin(admin.ModelAdmin):
    model = Event
    # list_display: Configures which event fields to display on the event manager list in the admin backend
    list_display = ['name', 'start_time', 'end_time', 'description']
    # fields: Configures which event fields to display on an event in the admin backend
    fields = ['name', 'start_time', 'end_time', 'description', 'users']
    # inlines: Configures the TabularInlines to display with the fields
    inlines = [
        ChatInline,
    ]

# Configures which models to display in the admin backend
# Must register each model in events/models.py here:
admin.site.register(Event, EventAdmin)