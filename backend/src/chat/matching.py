
from Profile.models import Profile, UserQuiz

class UserMatching():
	'''
	This class is used to match two users together
	based on the contents of their personality quiz answers
	'''
	def __init__(self, user1, user2):
		self.user1 = user1
		self.user2 = user2
		self.quiz1 = UserQuiz.objects.get(profile=user1)
		self.quiz2 = UserQuiz.objects.get(profile=user2)
		self.score = self.calc_score()

	def __str__():
		return str(self.user1) + ' matching with ' + str(self.user2) + ' with a score of ' + self.score

	def calc_score(self):
		'''
		Calculates the score given two quizzes
		'''
		score = 0
		if self.quiz1.a1 == self.quiz2.a1:
			score += 1
		if self.quiz1.a2 == self.quiz2.a2:
			score += 1
		if self.quiz1.a3 == self.quiz2.a3:
			score += 1
		if self.quiz1.a4 == self.quiz2.a4:
			score += 1
		if self.quiz1.a5 == self.quiz2.a5:
			score += 1
		if self.quiz1.a6 == self.quiz2.a6:
			score += 1
		if self.quiz1.a7 == self.quiz2.a7:
			score += 1
		if self.quiz1.a8 == self.quiz2.a8:
			score += 1
		if self.quiz1.a9 == self.quiz2.a9:
			score += 1
		if self.quiz1.a10 == self.quiz2.a10:
			score += 1
		return score
