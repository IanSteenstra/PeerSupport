import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import numpy as np
import argparse
import tqdm

class QuizResponseData():
	def __init__(self, filename):
		self.responses = []
		with open(filename, 'r') as f:
			for line in f.readlines()[1:]:
				line = line.strip('\n').strip(' ')
				line = line.split(',')
				self.responses.append(line[2:])
		print(self.responses)


	def get_batches(self, batch_size):
		'''
		should return torch.tensor() of list of data of size batch_size
		'''
		pass

	def to_tensor():
		pass


class MLP(nn.Module):
	def __init__(self, input_dim, hidden_dims):
		super(MLP, self).__init__()
		self.layers = []
		self.layers.append(nn.Linear(input_dim, hidden_dims[0]))
		for i in range(1, len(hidden_dims)):
			self.layers.append(nn.Linear(hidden_dims[i-1], hidden_dims[i]))
		self.sigmoid = nn.Sigmoid()

	def forward(self, x):
		'''
		Forward function with ReLU activation at each hidden layer
		'''
		for i in range(len(self.layers)):
			x = F.relu(self.layers[i](x))
		return self.sigmoid(x)


def parse_args():
	'''
	Set up for command-line arguments
		-f --> data input file name [required]
		-e --> number of epochs to train the data on
		-h --> list of dimensions of each hidden layer
		-b --> batch_size used for training data
		-lr --> learning rate for neural network
		-j --> the job id of current job
	Use:
		python3 train.py -f data.csv -e 10 -h 64 32 16 -b 1024 -lr 0.01 -j 1
	'''
	parser = argparse.ArgumentParser(description='train.py')

	parser.add_argument('-f', dest='fname')
	parser.add_argument('-e', dest='epochs', default=10, type=int)
	parser.add_argument('-hd', dest='hidden_dims', nargs='+', default=[], type=list)
	parser.add_argument('-b', dest='batch_size', default=1024, type=int)
	parser.add_argument('-lr', dest='learning_rate', default=0.01, type=float)
	parser.add_argument('-j', dest='jobid', default=0, type=int)

	return parser.parse_args()

if __name__=='__main__':
	args = parse_args()

	filename = args.fname
	epochs = args.epochs
	hidden_dims = args.hidden_dims
	batch_size = args.batch_size
	learning_rate = args.learning_rate
	jobid = args.jobid

	data = QuizResponseData(filename)

	if torch.cuda.is_available():
		device = 'cuda'
	else:
		device = 'cpu'

	network = MLP(data.size, hidden_dims)
	loss_function = nn.BCELoss()
	optimizer = optim.SGD(network.parameters(), lr=learning_rate)

	for e in range(epochs):
		running_loss = 0
		for bidx, (targets, labels) in enumerate(tqdm(data.get_batches(batch_size), total=batch_size)):
			targets = targets.to(device)
			labels = labels.to(device)
			network.zero_grad()
			preds = network(targets)
			loss = loss_function(preds, labels)
			loss.backward()
			optimizer.step()
			running_loss += loss.item()

		print('epoch', e, running_loss, bidx, running_loss/(bidx+1))



