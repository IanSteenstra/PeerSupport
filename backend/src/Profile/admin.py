from django.contrib import admin

from .models import Profile, UserQuiz, CounselorQuiz

class ProfileAdmin(admin.ModelAdmin):
	list_display = ('user', 'alias')

class UserQuizAdmin(admin.ModelAdmin):
	list_display = ('profile', 
					'happiness', 
					'hometown', 
					'receiving_giving', 
					'religion', 
					'relation_to_others', 
					'government_assistance', 
					'local_community', 
					'immediate_family', 
					'fulfilling_work', 
					'leader_social_circle', 
					'created')

class CounselorQuizAdmin(admin.ModelAdmin):
	list_display = ('profile', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'created')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(UserQuiz, UserQuizAdmin)
admin.site.register(CounselorQuiz, CounselorQuizAdmin)
