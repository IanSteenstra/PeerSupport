from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny

from .models import Profile
from .serializers import ProfileSerializer

class ProfileViewSet(viewsets.ViewSet):
  """
  A viewset for viewing and editing profile instances.
  """
  serializer_class = ProfileSerializer
  queryset = Profile.objects.all()

  def get_permissions(self):
    if self.action == 'list':
    	self.permission_classes = [AllowAny,]
    elif self.action == 'retrieve':
    	self.permission_classes = [AllowAny,]

    return super(self.__class__, self).get_permissions()

  def list(self, request):
    queryset = Profile.objects.all()
    serializer = ProfileSerializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, pk=None):
    queryset = Profile.objects.all()
    profile = get_object_or_404(queryset, pk=pk)
    if (request.user != profile.user and not request.user.is_staff):
    	return Response("403 Forbidden. User not authorized.")

    serializer = ProfileSerializer(profile)
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