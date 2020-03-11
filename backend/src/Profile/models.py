from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	alias = models.CharField(max_length=20, null=True, blank=True)
	friends = models.ManyToManyField('self', blank=True, symmetrical=False)
	chat_rooms = models.ManyToManyField('chat.Chat', related_name='chat_rooms', blank=True)
	best_matches = models.ManyToManyField('self', related_name='matches', blank=True, symmetrical=False)

	def __str__(self):
		return self.user.username

class UserQuiz(models.Model):
	'''
	Quiz model that holds responses to questions asked on the perosnality quiz for users
	'''
	profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
	a1 = models.FloatField()
	a2 = models.FloatField()
	a3 = models.FloatField()
	a4 = models.FloatField()
	a5 = models.FloatField()
	a6 = models.FloatField()
	a7 = models.FloatField()
	a8 = models.FloatField()
	a9 = models.FloatField()
	a10 = models.FloatField()
	created = models.DateTimeField()

class CounselorQuiz(models.Model):
	'''
	Quiz model that holds responses to questions asked on the perosnality quiz for counselors
	'''
	profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
	a1 = models.FloatField()
	a2 = models.FloatField()
	a3 = models.FloatField()
	a4 = models.FloatField()
	a5 = models.FloatField()
	a6 = models.FloatField()
	a7 = models.FloatField()
	a8 = models.FloatField()
	a9 = models.FloatField()
	a10 = models.FloatField()
	created = models.DateTimeField()
