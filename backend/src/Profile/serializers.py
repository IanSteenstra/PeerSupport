from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
  username = serializers.SerializerMethodField('get_username')
  chat_rooms = serializers.StringRelatedField(many=True, required=False)


  def create(self, validated_data):
    user = User(
        email=validated_data['email'],
        username=validated_data['username']
    )
    user.set_password(validated_data['password'])
    user.save()
    profile = Profile(user=user)
    profile.save()
    return profile

  class Meta:
    model = Profile
    fields = ('id', 'username', 'friends', 'chat_rooms')
    extra_kwargs = {'password': {'write_only': True}}


  def get_username(self, obj):
    return obj.user.username


class ProfileUsernameSerializer(serializers.ModelSerializer):
  username = serializers.SerializerMethodField('get_username')

  class Meta:
    model = Profile
    fields = ('username',)

  def get_username(self, obj):
    return obj.user.username