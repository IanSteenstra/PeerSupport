from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from multiselectfield import MultiSelectField


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="user")
    alias = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.user.username


class UserQuiz(models.Model):
    '''
    Quiz model that holds responses to questions asked on the personality quiz for users
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

    class Meta:
        verbose_name = u'User Quiz'
        verbose_name_plural = u'User Quizzes'


class CounselorQuiz(models.Model):
    '''
    Quiz model that holds responses to questions asked on the personality quiz for counselors
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
    username = models.CharField(max_length=120, default='')
    email = models.EmailField(max_length=255)
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
