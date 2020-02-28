from rest_framework import serializers
from events.models import Event

# Lead Serializer
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'