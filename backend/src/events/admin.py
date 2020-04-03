from django.contrib import admin

from .models import Event
from chat.models import Chat

# class ChatAdmin(admin.ModelAdmin):
#     def formfield_for_foreignkey(self, db_field, request, **kwargs):
#         if db_field.name == "car":
#             kwargs["queryset"] = Car.objects.filter(owner=request.user)
#         return super().formfield_for_foreignkey(db_field, request, **kwargs)

class ChatInline(admin.TabularInline):
    model = Chat
    def get_extra(self, request, obj=None, **kwargs):
        if obj is None:
            return self.extra
        return 0

class EventAdmin(admin.ModelAdmin):
    model = Event
    list_display = ['name', 'start_time', 'end_time', 'description']
    fields = ['name', 'start_time', 'end_time', 'description']
    inlines = [
        ChatInline,
    ]

admin.site.register(Event, EventAdmin)
# admin.site.register(Chat, ChatAdmin)