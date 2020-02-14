from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .models import Profile, UserQuiz, CounselorQuiz
from .serializers import ProfileSerializer, UserQuizSerializer, CounselorQuizSerializer


class ProfileViewSet(viewsets.ViewSet):
  """
  A viewset for viewing and editing profile instances.
  """
  serializer_class = ProfileSerializer
  queryset = Profile.objects.all()

  def get_permissions(self):
    if self.action == 'list':
    	self.permission_classes = [IsAdminUser, IsAuthenticated]
    elif self.action == 'retrieve':
    	self.permission_classes = [IsAuthenticated]

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

class UserQuizViewSet(viewsets.ViewSet):
  '''
  A viewset for viewing and editing UserQuiz instances
  '''
  serializer_class = UserQuizSerializer
  queryset = UserQuiz.objects.all()

  def get_permission(self):
    if self.action == 'list':
      self.permission_classes = [IsAdminUser, IsAuthenticated]
    elif self.action == 'retrieve':
      self.permission_classes = [IsAuthenticated]
    return super(self.__class__, self).get_permissions()

  def list(self, request):
    serializer = UserQuizSerializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, pk=None):
    userQuiz = get_object_or_404(queryset, pk=pk)
    if (request.user != profile.user and not request.user.is_staff):
      return Response("403 Forbidden. User not authorized.")

    serializer = UserQuizSerializer(userQuiz)
    return Response(serializer.data)

  def update(self, instance, validated_data):
    profile_data = validated_data.pop('profile', None)
    for attr, value in profile_data.items():
      setattr(instance.profile, attr, value)
    for attr, value in validated_data.items():
      setattr(instance, attr, value)
    instance.save()
    return instance

class CounselorQuizViewSet(viewsets.ViewSet):
  '''
  A viewset for viewing and editing UserQuiz instances
  '''
  serializer_class = CounselorQuizSerializer
  queryset = CounselorQuiz.objects.all()

  def get_permission(self):
    if self.action == 'list':
      self.permission_classes = [IsAdminUser, IsAuthenticated]
    elif self.action == 'retrieve':
      self.permission_classes = [IsAuthenticated]
    return super(self.__class__, self).get_permissions()

  def list(self, request):
    serializer = CounselorQuizSerializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, pk=None):
    counselorQuiz = get_object_or_404(queryset, pk=pk)
    if (request.user != profile.user and not request.user.is_staff):
      return Response("403 Forbidden. User not authorized.")

    serializer = CounselorQuizSerializer(userQuiz)
    return Response(serializer.data)

  def update(self, instance, validated_data):
    profile_data = validated_data.pop('profile', None)
    for attr, value in profile_data.items():
      setattr(instance.profile, attr, value)
    for attr, value in validated_data.items():
      setattr(instance, attr, value)
    instance.save()
    return instance
