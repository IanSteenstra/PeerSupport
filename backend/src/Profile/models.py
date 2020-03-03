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
	profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
	happiness = models.IntegerField()
	hometown = models.IntegerField()
	receiving_giving = models.IntegerField()
	religion = models.IntegerField()
	relation_to_others = models.IntegerField()
	government_assistance = models.IntegerField()
	local_community = models.IntegerField()
	immediate_family = models.IntegerField()
	fulfilling_work = models.IntegerField()
	leader_social_circle = models.IntegerField()
	created = models.DateTimeField()

class CounselorQuiz(models.Model):
	'''
	Quiz model that holds responses to questions asked on the perosnality quiz for counselors
	'''
	profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
	a1 = models.IntegerField()
	a2 = models.IntegerField()
	a3 = models.IntegerField()
	a4 = models.IntegerField()
	a5 = models.IntegerField()
	a6 = models.IntegerField()
	a7 = models.IntegerField()
	a8 = models.IntegerField()
	a9 = models.IntegerField()
	a10 = models.IntegerField()
	created = models.DateTimeField()
