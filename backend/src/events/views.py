from django.shortcuts import render
from .apps import EventsConfig
from django.contrib.auth.models import User

from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny

from .models import Event
from .serializers import EventSerializer


class EventViewSet(viewsets.ViewSet):
    """
    A viewset for viewing and editing event instances.
    """
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def get_permissions(self):
        if self.action == 'retreive':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser, IsAuthenticated]

        return [permission() for permission in self.permission_classes]

    def list(self, request):
        queryset = Event.objects.all()
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request):
        event = Event.objects.all()
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def update(self, instance, validated_data):
        # First, update the User
        user_data = validated_data.pop('user', None)
        for attr, value in user_data.items():
            setattr(instance.user, attr, value)
        # Then, update UserProfile
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
