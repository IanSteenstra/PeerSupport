# this file will produce the word embeddings for sentences in our dataset

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import pandas as pd
from tqdm import tqdm
import sys

class DataSet():
	def __init__(self, filename):
		df = pd.read_csv(filename)
		self.sentences = df['comment_text']
		self.create_vocab()
		self.word_to_idx = {w:idx for idx, w in enumerate(self.vocab)}
		self.idx_to_word = {idx:w for idx, w in enumerate(self.vocab)}

	def create_vocab(self):
		'''
		Create the vocab using the trigram model;
		
			context_word center_word context_word

		'''
		self.word_count = 0
		self.vocab = set()
		for sentence in tqdm(self.sentences, total=len(self.sentences)):
			split_sentence = sentence.strip('\"').split(' ')
			for w in split_sentence:
				self.word_count += 1
				self.vocab.add(w)

	def get_batches(self, batch_size):
		words = []
		targets = []
		for sentence in self.sentences:
			split_sentence = sentence.strip('\"').split(' ')
			for i in range(len(split_sentence) - 2):
				words.append((self.word_to_idx[split_sentence[i]], self.word_to_idx[split_sentence[i+1]]))
				targets.append(self.word_to_idx[split_sentence[i+2]])
				if len(words) >= batch_size and len(targets) >= batch_size:
					yield words, targets
					words = []
					targets = []
		if len(words) > 0:
			return words, targets

class TrigramLanguageModeler(nn.Module):

	def __init__(self, vocab_size, embedding_dim, context_size):
		super(TrigramLanguageModeler, self).__init__()
		self.embeddings = nn.Embedding(vocab_size, embedding_dim)
		self.linear1 = nn.Linear(context_size*embedding_dim, 128)
		self.linear2 = nn.Linear(128, vocab_size)

	def forward(self, inputs):
		embeds = self.embeddings(inputs)
		out = F.relu(self.linear1(embeds))
		out = self.linear2(out)
		return F.log_softmax(out, dim=1)

if __name__=='__main__':
	embedding_dim = int(sys.argv[1])
	context_size = int(sys.argv[2])
	if torch.cuda.is_available():
		device = 'cuda'
	else:
		device = 'cpu'
	training_data = DataSet('./jigsaw-toxic-comment-classification-challenge/train.csv')
	loss_function = nn.NLLLoss()
	model = TrigramLanguageModeler(len(training_data.vocab), embedding_dim, context_size).to(device)
	optimizer = optim.SGD(model.parameters(), lr=0.001)

	for epoch in range(10):
		total_loss = 0
		for context, target in tqdm(training_data.get_batches(1024), total=training_data.word_count):
			context = torch.tensor(context, dtype=torch.long).to(device)
			target = torch.tensor(target, dtype=torch.long).to(device)
			model.zero_grad()
			log_probs = model(context)
			loss = loss_function(log_probs, target)
			loss.backward()
			opimizer.step()
			total_loss += loss.item()
		print('epoch ' + str(epoch) + ' ' + str(total_loss))