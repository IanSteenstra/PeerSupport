from events.models import Event
from rest_framework import viewsets, permissions
from .serializers import EventSerializer

# Event Viewset
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EventSerializer