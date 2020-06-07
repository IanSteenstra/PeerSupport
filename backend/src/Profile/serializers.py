from rest_framework import serializers
from .models import Profile, UserQuiz, CounselorQuiz, ResearchQuiz
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    email = serializers.SerializerMethodField('get_email')
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password1'])
        user.save()
        profile = Profile(user=user)
        profile.save()
        return profile

    class Meta:
        model = Profile
        fields = ('pk', 'username', 'email', 'friends', 'chat_rooms', 'best_matches')
        extra_kwargs = {'password': {'write_only': True}}

    def get_username(self, obj):
        return obj.user.username
    def get_email(self, obj):
        return obj.user.email


class ProfileUsernameSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    class Meta:
        model = Profile
        fields = ('username',)

    def get_username(self, obj):
        return obj.user.username


class UserQuizSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    happiness = serializers.FloatField()
    hometown = serializers.FloatField()
    receiving_giving = serializers.FloatField()
    religion = serializers.FloatField()
    relation_to_others = serializers.FloatField()
    government_assistance = serializers.FloatField()
    local_community = serializers.FloatField()
    immediate_family = serializers.FloatField()
    fulfilling_work = serializers.FloatField()
    leader_social_circle = serializers.FloatField()
    created = serializers.DateTimeField()

    class Meta:
        nodel = UserQuiz
        fields = ('profile', 'happiness', 'hometown', 'receiving_giving', 'religion', 'relation_to_others', 'government_assistance'
                    'local_community', 'immediate_family', 'fulfilling_work', 'leader_social_circle', 'created')

    def create(self, validated_data):
        profile = Profile(
        username=validated_data['username'],
        alias=validated_data['alias'],
        )
        profile.save()
        userQuiz = UserQuiz(
        profile=profile,
        happiness=validated_data['happiness'],
        hometown=validated_data['hometown'],
        receiving_giving=validated_data['receiving_giving'],
        religion=validated_data['religion'],
        relation_to_others=validated_data['relation_to_others'],
        government_assistance=validated_data['government_assistance'],
        local_community=validated_data['local_community'],
        immediate_family=validated_data['immediate_family'],
        fulfilling_work=validated_data['fulfilling_work'],
        leader_social_circle=validated_data['leader_social_circle'],
        created=validated_data['created'],
        )
        userQuiz.save()
        return userQuiz

    def update(self, instance, validated_data):
        instance.profile = validated_data.get('profile', instance.profile)
        instance.happiness = validated_data.get(
            'happiness', instance.happiness)
        instance.hometown = validated_data.get('hometown', instance.hometown)
        instance.receiving_giving = validated_data.get(
            'receiving_giving', instance.receiving_giving)
        instance.religion = validated_data.get('religion', instance.religion)
        instance.relation_to_others = validated_data.get(
            'relation_to_others', instance.relation_to_others)
        instance.government_assistance = validated_data.get(
            'government_assistance', instance.government_assistance)
        instance.local_community = validated_data.get(
            'local_community', instance.local_community)
        instance.immediate_family = validated_data.get(
            'immediate_family', instance.immediate_family)
        instance.fulfilling_work = validated_data.get(
            'fulfilling_work', instance.fulfilling_work)
        instance.leader_social_circle = validated_data.get(
            'leader_social_circle', instance.leader_social_circle)
        instance.created = validated_data.get('created', instance.created)
        return instance


class CounselorQuizSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    a1 = serializers.FloatField()
    a2 = serializers.FloatField()
    a3 = serializers.FloatField()
    a4 = serializers.FloatField()
    a5 = serializers.FloatField()
    a6 = serializers.FloatField()
    a7 = serializers.FloatField()
    a8 = serializers.FloatField()
    a9 = serializers.FloatField()
    a10 = serializers.FloatField()
    created = serializers.DateTimeField()

    class Meta:
        nodel = CounselorQuiz
        fields = ('profile', 'a1', 'a2', 'a3', 'a4', 'a5',
                  'a6', 'a7', 'a8', 'a9', 'a10', 'created')

    def create(self, validated_data):
        profile = Profile(
        username=validated_data['username'],
        alias=validated_data['alias'],
        )
        profile.save()
        counselorQuiz = CounselorQuiz(
        profile=profile,
        a1=validated_data['a1'],
        a2=validated_data['a2'],
        a3=validated_data['a3'],
        a4=validated_data['a4'],
        a5=validated_data['a5'],
        a6=validated_data['a6'],
        a7=validated_data['a7'],
        a8=validated_data['a8'],
        a9=validated_data['a9'],
        a10=validated_data['a10'],
        created=validated_data['created'],
        )
        counselorQuiz.save()
        return counselorQuiz

    def update(self, instance, validated_data):
        instance.profile = validated_data.get('profile', instance.profile)
        instance.a1 = validated_data.get('a1', instance.a1)
        instance.a2 = validated_data.get('a2', instance.a2)
        instance.a3 = validated_data.get('a3', instance.a3)
        instance.a4 = validated_data.get('a4', instance.a4)
        instance.a5 = validated_data.get('a5', instance.a5)
        instance.a6 = validated_data.get('a6', instance.a6)
        instance.a7 = validated_data.get('a7', instance.a7)
        instance.a8 = validated_data.get('a8', instance.a8)
        instance.a9 = validated_data.get('a9', instance.a9)
        instance.a10 = validated_data.get('a10', instance.a10)
        instance.created = validated_data.get('created', instance.created)
        return instance
    
class ResearchQuizSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    gender = serializers.CharField()
    race = serializers.CharField()
    exp = serializers.CharField()
    methods = serializers.CharField()
    age = serializers.CharField()
    specializations = serializers.CharField()
    goTo = serializers.CharField()
    understands = serializers.CharField()
    anon = serializers.CharField()
    compatible = serializers.CharField()
    sameProbs = serializers.CharField()
    support = serializers.CharField()
    contact = serializers.CharField()
    created = serializers.DateTimeField()

    class Meta:
        nodel = ResearchQuiz
        fields = '__all__'

    def create(self, validated_data):
        profile = Profile(**validated_data)
        profile.save()
        researchQuiz = ResearchQuiz(**validated_data)
        researchQuiz.save()
        return researchQuiz

    def update(self, instance, validated_data):
        instance.profile = validated_data.get('profile', instance.profile)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.race = validated_data.get('race', instance.race)
        instance.exp = validated_data.get('exp', instance.exp)
        instance.methods = validated_data.get('methods', instance.methods)
        instance.age = validated_data.get('age', instance.age)
        instance.specializations = validated_data.get(
            'specializations', instance.specializations)
        instance.goTo = validated_data.get('goTo', instance.goTo)
        instance.understands = validated_data.get(
            'understands', instance.understands)
        instance.anon = validated_data.get('anon', instance.anon)
        instance.compatible = validated_data.get(
            'compatible', instance.compatible)
        instance.sameProbs = validated_data.get(
            'sameProbs', instance.sameProbs)
        instance.support = validated_data.get('support', instance.support)
        instance.contact = validated_data.get('contact', instance.contact)
        instance.created = validated_data.get('created', instance.created)
        return instance
