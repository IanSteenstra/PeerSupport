from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class ProfileSerializer(serializers.ModelSerializer):
  username = serializers.SerializerMethodField()

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
    fields = ('username', 'user', 'alias')
    extra_kwargs = {'password': {'write_only': True}}


  def get_username(self, obj):
    return obj.user.username
