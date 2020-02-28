from rest_framework import serializers

from .models import Event
from django.contrib.auth.models import User


class EventSerializer(serializers.ModelSerializer):
    event = serializers.SerializerMethodField()

    name = serializers.CharField()
    date = serializers.DateTimeField()
    description = serializers.CharField()
    created = serializers.DateTimeField()

    class Meta:
        model = Event
        fields = ('name', 'date', 'description', 'created')

    def create(self, validated_data):
        return event(
            name=serializers.CharField(),
            date=serializers.DateTimeField(),
            description=serializers.CharField(),
            created=serializers.DateTimeField())

    def get_event_name(self, obj):
        return obj.name

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.date = validated_data.get('date', instance.date)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.created = validated_data.get('created', instance.created)
        return instance
