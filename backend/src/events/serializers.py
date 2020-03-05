from rest_framework import serializers

from .models import Event
from django.contrib.auth.models import User


class EventSerializer(serializers.ModelSerializer):
    event = serializers.SerializerMethodField()

    name = serializers.CharField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    description = serializers.CharField()
    created = serializers.DateTimeField()

    class Meta:
        model = Event
        fields = ('name', 'start_time',
                  'end_time', 'description', 'created')

    def create(self, validated_data):
        return Event.objects.create(**validated_data)

    def get_event_name(self, obj):
        return obj.name

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.start_time = validated_data.get(
            'start_time', instance.start_time)
        instance.start_time = validated_data.get('end_time', instance.end_time)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.created = validated_data.get('created', instance.created)
        return instance
