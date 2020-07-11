from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from multiselectfield import MultiSelectField


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")
    friends = models.ManyToManyField('self', blank=True, symmetrical=False)
    chat_rooms = models.ManyToManyField(
        'chat.Chat', related_name='chat_rooms', blank=True)
    best_matches = models.ManyToManyField(
        'self', related_name='matches', blank=True, symmetrical=False)
    alias = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.user.username


class PreStudyQuiz(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    q1 = models.IntegerField(null=True)
    q2 = models.IntegerField(null=True)
    q3 = models.IntegerField(null=True)
    q4 = models.IntegerField(null=True)
    q5 = models.IntegerField(null=True)
    q6 = models.IntegerField(null=True)
    q7 = models.IntegerField(null=True)
    q8 = models.IntegerField(null=True)
    q9 = models.IntegerField(null=True)
    q10 = models.IntegerField(null=True)
    q11 = models.IntegerField(null=True)
    q12 = models.IntegerField(null=True)
    q13 = models.IntegerField(null=True)
    q14 = models.IntegerField(null=True)
    q15 = models.IntegerField(null=True)
    q16 = models.IntegerField(null=True)
    q17 = models.IntegerField(null=True)
    q18 = models.IntegerField(null=True)
    q19 = models.IntegerField(null=True)
    q20 = models.IntegerField(null=True)
    q21 = models.IntegerField(null=True)
    created = models.DateTimeField(null=True)

    class Meta:
        verbose_name = u'PreStudy Quiz'
        verbose_name_plural = u'PreStudy Quizzes'


class UserQuiz(models.Model):
    '''
    Quiz model that holds responses to questions asked on the perosnality quiz for users
    '''
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    happiness = models.IntegerField(null=True)
    hometown = models.IntegerField(null=True)
    receiving_giving = models.IntegerField(null=True)
    religion = models.IntegerField(null=True)
    relation_to_others = models.IntegerField(null=True)
    government_assistance = models.IntegerField(null=True)
    local_community = models.IntegerField(null=True)
    immediate_family = models.IntegerField(null=True)
    fulfilling_work = models.IntegerField(null=True)
    leader_social_circle = models.IntegerField(null=True)
    created = models.DateTimeField(null=True)

    class Meta:
        verbose_name = u'User Quiz'
        verbose_name_plural = u'User Quizzes'


class CounselorQuiz(models.Model):
    '''
    Quiz model that holds responses to questions asked on the personality quiz for counselors
    '''
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    a1 = models.FloatField(null=True)
    a2 = models.FloatField(null=True)
    a3 = models.FloatField(null=True)
    a4 = models.FloatField(null=True)
    a5 = models.FloatField(null=True)
    a6 = models.FloatField(null=True)
    a7 = models.FloatField(null=True)
    a8 = models.FloatField(null=True)
    a9 = models.FloatField(null=True)
    a10 = models.FloatField(null=True)
    created = models.DateTimeField(null=True)

    class Meta:
        verbose_name = u'Counselor Quiz'
        verbose_name_plural = u'Counselor Quizzes'


class ResearchQuiz(models.Model):
    """
    Quiz model that holds responses to questions asked on the quiz to get people's opinions on what they would want
    """
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)

    # Fields:
    gender = models.CharField(max_length=100)
    race = models.CharField(max_length=100)
    exp = models.CharField(max_length=100)
    methods = models.CharField(max_length=100)
    age = models.CharField(max_length=100)
    specializations = models.CharField(max_length=100)
    goTo = models.CharField(max_length=100)
    understands = models.CharField(max_length=100)
    anon = models.CharField(max_length=100)
    compatible = models.CharField(max_length=100)
    sameProbs = models.CharField(max_length=100)
    support = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = u'Research Quiz'
        verbose_name_plural = u'Research Quizzes'


class Counselor(models.Model):
    '''
    Quiz model that holds responses to questions asked on the perosnality quiz for counselors
    '''

    username = models.CharField(max_length=120, default='')
    email = models.EmailField(max_length=255)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    created = models.DateTimeField()

    '''
	male = "Male"
	female = "Female"
	non_binary = "Non Binary"
	trans = "Transexual"
	gender_fluid = "Gender Fluid"
	'''

    Gender_Choice = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Non Binary', 'Non Binary'),
        ('Transgender', 'Transgender'),
        ('Gender Fluid', 'Gender Fluid'),
        ('Prefer not to answer', 'Prefer not to answer')
    )
    Ethnic_Choice = (
        ('White', 'White'),
        ('Black or Afican American', 'Black or Afican American'),
        ('Native American or American Indian',
         'Native American or American Indian'),
        ('Hispanic or Latino', 'Hispanic or Latino'),
        ('Asian / Pacific Islander', 'Asian / Pacific Islander'),
        ('Midddle Eastern', 'Middle Eastern'),
        ('South Asian', 'South Asian'),
        ('Other', 'Other')
    )

    gender = models.CharField(
        max_length=30, blank=True, null=True, choices=Gender_Choice)

    ethnic_origin = MultiSelectField(choices=Ethnic_Choice)
