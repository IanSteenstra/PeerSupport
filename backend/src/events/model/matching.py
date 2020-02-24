import numpy as np
import matplotlib.pyplot as plt
import sys
import math
import random
import operator

def euclidean(x, x_p):
    return ((x[0] - x_p[0]) ** 2 + (x[1] - x_p[1]) ** 2) ** 0.5

def greatest_euclidean(data, centers):
    maxi = {}
    for x in centers:
        for x_p in data:
            euc = euclidean(x, x_p)
            if x_p not in maxi:
                maxi[x_p] = 0
            maxi[x_p] += euc
    return max(maxi.items(), key=operator.itemgetter(1))[0]

# Uses a greedy approach, selects a data point at random and assigns this as a center for a classification
# it then finds the furthest data point from this and assigns this as a center and places it in the set
# the next center will be the furthest datapoint from all centers until all regions have a center
def gen_centers(M, data):
    centers = []
    N = len(data)
    rand = random.randint(0, N - 1)
    centers.append(data.pop(rand))
    center = (0, 0)
    classifiers = []
    for i in range(M - 1):
        center = greatest_euclidean(data, centers)
        data.remove(center)
        centers.append(center)

    for x in data:
        num = voronoi(x, centers)
        classifiers.append(num)
    return centers, classifiers

# Determine the Voronoi region for the data point. This basically just decides how to classify all the data points
# assigning it to the closest center by euclidean distance
def voronoi(x, centers):
    order = []
    for i in range(len(centers)):
        datapoint = centers[i]
        # Euclidean to x
        order.append((euclidean(x, datapoint), i))
    order.sort()
    g = order[0][1]
    return g

# Generates 10,000 random datapoints with x and y values between 0 and 1
def generate_data():
    data = []
    for x1_ in range(100):
        for x2_ in range(100):
            x1 = np.random.uniform(0, 1)
            x2 = np.random.uniform(0, 1)
            data.append((x1, x2))
    return data

def plot(M):
    data = generate_data()
    centers, classifers = gen_centers(M, data) 
    unique=set(classifers)
    print(unique)
    plt.scatter(*zip(*data), c=classifers, cmap='rainbow')
    plt.scatter(*zip(*centers), c='black')
    plt.title('Greedy with {} Regions'.format(M))
    plt.xlabel('x1', color='#1C2833')
    plt.ylabel('x2', color='#1C2833')
    plt.grid()
    plt.show()
    


if __name__ == "__main__":
    # 10 Clusters for users
    regions = 10
    plot(regions)

    # Assumption: Users will be datapoints, users will create a voronoi region and counselors
    # will be assigned to their closest associated region.

    # Just using greedy. May add in branch and bound.