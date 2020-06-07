from rest_framework import serializers
from .models import Event
from django.contrib.auth.models import User

# Serializers convert plain Python data to SQL for the database
# Django Serializers: https://docs.djangoproject.com/en/3.0/topics/serialization/
class EventSerializer(serializers.ModelSerializer):
    # event: Passes a reference to the event object along with the data
    event = serializers.SerializerMethodField('get_event')
    # key: Takes the auto-generated id for the event and converts the name to key, 
    # for the API to allow it to connect to a table on the frontend
    key = serializers.SerializerMethodField(
        source='id')
    
    class Meta:
        model = Event
        # fields: Configure what is displayed on the API View
        fields = ('key','name', 'start_time',
                  'end_time', 'description', 'created', 'event', 'users')

    # create: Creates a new Event object
    def create(self, validated_data):
        return Event.objects.create(**validated_data)

    # get_event: Works with the event object reference and returns the name of the event
    def get_event(self, obj):
        return obj.name
    
    # get_key: Gets the event object's id
    def get_key(self, obj):
        return obj.id

    # update: Replaces the old data with new data when an update occurs
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.start_time = validated_data.get(
            'start_time', instance.start_time)
        instance.start_time = validated_data.get('end_time', instance.end_time)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.created = validated_data.get('created', instance.created)
        return instance
