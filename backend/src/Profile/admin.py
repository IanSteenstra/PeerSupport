from django.contrib import admin

from .models import Profile, UserQuiz, CounselorQuiz, ResearchQuiz

admin.site.register(Profile)
admin.site.register(UserQuiz)
admin.site.register(CounselorQuiz)
admin.site.register(ResearchQuiz)
