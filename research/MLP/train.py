import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import numpy as np
import argparse
from tqdm import tqdm

class QuizResponseData():
    def __init__(self, filename):
        self.responses = []
        with open(filename, 'r') as f:
            for line in f.readlines()[1:]:
                line = line.strip('\n').strip(' ')
                line = line.split(',')
                line = [int(x) for x in line[2:]]
                self.responses.append(line)

    def get_batches(self, batch_size):
        '''
        should return torch.tensor() of list of data of size batch_size
        '''
        targets = []
        labels = []
        for response in self.responses:
            targets.append(response[:-1])
            labels.append(response[-1])
            if len(targets) >= batch_size or len(labels) >= batch_size:
                yield self.to_tensor(targets, labels)
                targets = []
                labels = []
        if len(targets) > 0 or len(labels) > 0:
            return self.to_tensor(targets, labels)

    def to_tensor(self, targets, labels):
        targets = torch.tensor(targets, dtype=torch.float)
        labels = torch.tensor(labels, dtype=torch.float)
        return targets, labels

class MLP(nn.Module):
    def __init__(self, input_dim, hidden_dims):
        super(MLP, self).__init__()
        self.h1 = nn.Linear(input_dim, hidden_dims[0])
        self.h2 = nn.Linear(hidden_dims[0], hidden_dims[1])
        self.out = nn.Linear(hidden_dims[1], 1)

    def forward(self, x):
        '''
        Forward function with ReLU activation at each hidden layer
        '''
        x = F.relu(self.h1(x))
        x = F.relu(self.h2(x))
        x = self.out(x)
        return torch.sigmoid(x)


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
    parser.add_argument('-d', dest='input_dim', default=20, type=int)
    parser.add_argument('-e', dest='epochs', default=100, type=int)
    parser.add_argument('-hd', dest='hidden_dims', nargs='+', default=[[8], [4]], type=list)
    parser.add_argument('-b', dest='batch_size', default=2, type=int)
    parser.add_argument('-lr', dest='learning_rate', default=0.01, type=float)
    parser.add_argument('-j', dest='jobid', default=0, type=int)

    args = parser.parse_args()
    if len(args.hidden_dims) != 2:
        print('Two Hidden Layer dimensions must be specified.')
    return parser.parse_args()

if __name__=='__main__':
    args = parse_args()

    input_dim = args.input_dim
    filename = args.fname
    epochs = args.epochs
    hidden_dims = [int(x[0]) for x in args.hidden_dims]
    batch_size = args.batch_size
    learning_rate = args.learning_rate
    jobid = args.jobid

    data = QuizResponseData(filename)

    if torch.cuda.is_available():
        device = 'cuda'
    else:
        device = 'cpu'

    network = MLP(input_dim, hidden_dims)
    loss_function = nn.BCELoss()
    optimizer = optim.Adam(network.parameters(), lr=learning_rate)
    # training
    for e in range(epochs):
        running_loss = 0
        for targets, labels in tqdm(data.get_batches(batch_size), total=len(data.responses)//batch_size):
            targets = targets.to(device)
            labels = labels.to(device).view(-1,1)
            network.zero_grad()
            preds = network(targets)
            loss = loss_function(preds, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()

        print('epoch', e, running_loss)
    # testing
    correct = 0
    batch_size = 1
    for targets, labels in tqdm(data.get_batches(batch_size), total=len(data.responses)//batch_size):
        targets = targets.to(device)
        labels = labels.to(device).view(-1, 1)
        preds = network(targets)
        threshold = torch.tensor([0.5])
        pred = (preds > threshold).float() * 1
        correct += pred.eq(labels.data).sum()
    correct = correct.item()
    print('Accuracy: ' + str(100.0* correct/len(data.responses)) + str('%'))
