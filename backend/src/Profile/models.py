from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
	alias = models.CharField(max_length=20, null=True, blank=True)

	def __str__(self):
		return self.user.username

class UserQuiz(models.Model):
	'''
	Quiz model that holds responses to questions asked on the perosnality quiz for users
	'''
	profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="profile")
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
	profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='profile')
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