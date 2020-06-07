from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, redirect
from django.http import HttpResponseForbidden
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.decorators import action

from .models import Profile, UserQuiz, CounselorQuiz, ResearchQuiz, Counselor
from chat.models import Chat
from rest_framework.authtoken.models import Token
from .serializers import ProfileSerializer, UserQuizSerializer, CounselorQuizSerializer, ResearchQuizSerializer
from chat.api.serializers import ChatSerializer
import json

class ProfileViewSet(viewsets.ViewSet):
    """
    A viewset for viewing and editing profile instances.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsAdminUser, ]
        elif self.action == 'retrieve':
            self.permission_classes = [AllowAny, ]

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
            p = get_object_or_404(Profile, pk=request.data['pk'])

            if friends_with(profile, p):
                return Response("You are already friends with this person")

            if profile.friends.filter(pk=request.data['pk']).exists():
                return Response("Friend request has already been sent")
            else:
                profile.friends.add(p)
                profile.save()
                return Response("Friend request sent")

        return Response("Profile pk required")

    @action(detail=True, methods=['put'], url_path='update-matches')
    def update_matches(self, request, pk=None):
        profile = get_object_or_404(Profile, pk=pk)
        profile.matches.set(matching_algorithm(pk=pk))
        return Response("Matches updated")


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

def add_to_queue(pk, score):
    queue = ChatQueue.objects.all()
    queue.chatQ.add(pk, score)

#create list of the users in queue with the 3 closest personality scores to this user
def matching_algorithm(pk):
    queue = ChatQueue.objects.all()
    matches = list()
    minDiff = -1
    thisScore = ChatQueue.objects.get(pk)
    for i in range(min(queue.count(), 3)):
        nextMatch = 0;
        for user in queue:
            if minDiff == -1 or abs(user[1] - userScore) <= minDiff and not user[0] in matches:
                minDiff = user[1] - userScore
                nextMatch = user[0]
        matches.append(nextMatch)
    return matches

class UserQuizViewSet(viewsets.ViewSet):
    '''
    A viewset for viewing and editing UserQuiz instances
    '''
    serializer_class = UserQuizSerializer
    queryset = UserQuiz.objects.all()
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

    @action(detail=True, methods=['put'], url_path='update-matches')
    def update_matches(self, request, pk=None):
      profile = get_object_or_404(Profile, pk=pk)
      profile.matches.set(matching_algorithm(pk=pk))
      return Response("Matches updated")
      
    def get_permission(self):
      if self.action == 'list':
        self.permission_classes = [IsAdminUser, IsAuthenticated]
      elif self.action == 'retrieve':
        self.permission_classes = [IsAuthenticated]
      return super(self.__class__, self).get_permissions()

    def list(self, request):
          queryset = UserQuiz.objects.all()
          serializer = UserQuizSerializer(queryset, many=True)
          return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = UserQuiz.objects.all()
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

    def retrieve(self, request, pk=None):
      queryset = UserQuiz.objects.all()
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

    def friends_with(profile, p):
      if profile.friends.filter(pk=p.pk).exists():
        if p.friends.filter(pk=profile.pk).exists():
          return True
      return False

    def matching_algorithm(pk):
      matches = []
      return matches

    def get_permission(self):
        if self.action == 'list':
            self.permission_classes = [IsAdminUser, IsAuthenticated]
        elif self.action == 'retrieve':
            self.permission_classes = [IsAuthenticated]
        return super(self.__class__, self).get_permissions()

    def list(self, request):
        queryset = CounselorQuiz.objects.all()
        serializer = CounselorQuizSerializer(queryset, many=True)
        return Response(serializer.data)


class ResearchQuizViewSet(viewsets.ViewSet):
    '''
    A viewset for viewing and editing UserQuiz instances
    '''
    serializer_class = ResearchQuizSerializer
    queryset = ResearchQuiz.objects.all()

    def get_permission(self):
        if self.action == 'list':
            self.permission_classes = [IsAdminUser, IsAuthenticated]
        elif self.action == 'retrieve':
            self.permission_classes = [IsAuthenticated]
        return super(self.__class__, self).get_permissions()

    def list(self, request):
        queryset = ResearchQuiz.objects.all()
        serializer = ResearchQuizSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = ResearchQuiz.objects.all()
        counselorQuiz = get_object_or_404(queryset, pk=pk)
        if (request.user != profile.user and not request.user.is_staff):
            return Response("403 Forbidden. User not authorized.")

        serializer = ResearchQuizSerializer(userQuiz)
        return Response(serializer.data)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        for attr, value in profile_data.items():
            setattr(instance.profile, attr, value)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
        
@api_view(['GET'])
@renderer_classes([JSONRenderer])
@permission_classes((permissions.IsAuthenticated,))
def get_chats(request):
    profile = get_object_or_404(Profile, pk=request.user.pk)
    queryset = profile.chat_rooms.all()
    chat_list = []
    for chat in queryset:
        chat_user = chat.participants.exclude(pk=request.user.pk)[0]
        chat_list.append(
            {
                'key': str(chat.pk),
                'name': chat_user.user.username
            })
    return Response(chat_list)

@api_view(['GET'])
@renderer_classes([JSONRenderer])
@permission_classes((permissions.IsAuthenticated,))
def get_friends(request):
    profile = get_object_or_404(Profile, pk=request.user.pk)
    queryset = profile.friends.all()
    friends = []
    for idx, friend in enumerate(queryset):
        friends.append({
            'key': str(idx),
            'name': friend.user.username
        })
    return Response(friends)
