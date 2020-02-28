from django.db import models
from multiselectfield import MultiSelectField

class User(models.Model):
	username = models.CharField(max_length=120, default='')
	email = models.EmailField(max_length = 255)
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
        ('Non Binary' 'Non Binary'),
        ('Transgender', 'Transgender'),
        ('Gender Fluid', 'Gender Fluid'),
        ('Perfer not to answer', 'Perfer not to answer')
    )
    Ethnic_Choice = (
    	('White', 'White'),
    	('Black or Afican American', 'Black or Afican American'),
    	('Native American or American Indian', 'Native American or American Indian'),
    	('Hispanic or Latino', 'Hispanic or Latino'),
    	('Asian / Pacific Islander','Asian / Pacific Islander'),
    	('Midddle Eastern', 'Middle Eastern'),
    	('South Asian','South Asian')
    	('Other', 'Other')
    	)

	gender = models.CharField( max_length=30, blank = True, null = True, choices=Gender_Choice)

	ethnic_origin = models.MultiSelectField(choices = Ethnic_Choice)