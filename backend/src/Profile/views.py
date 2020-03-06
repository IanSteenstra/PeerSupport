from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, redirect
from django.http import HttpResponseForbidden

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.decorators import action

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
    	self.permission_classes = [IsAdminUser,]
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
    if (request.user.pk is not profile.user.pk and not request.user.is_staff):
    	return HttpResponseForbidden()

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

  @action(detail=True, methods=['post'], url_path='add-friend')
  def add_friend(self, request, pk=None):
    profile = Profile.objects.get(pk=pk)
  
    if request.user.pk is not profile.user.pk:
      return HttpResponseForbidden()

    if 'pk' in request.data:
      p = get_object_or_404(Profile,pk=request.data['pk'])

      if friends_with(profile, p):
        return Response("You are already friends with this person")

      if profile.friends.filter(pk=request.data['pk']).exists():
        return Response("Friend request has already been sent")
      else:
        profile.friends.add(p)
        profile.save()
        return Response("Friend request sent")

    return Response("Profile pk required")
    

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

def friends_with(profile, p):
  if profile.friends.filter(pk=p.pk).exists():
    if p.friends.filter(pk=profile.pk).exists():
      return True
  return False