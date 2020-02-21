from Machine_learning import FitNeuralNetwork

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sqlite3
import pickle

# prepare
connection = sqlite3.connect('/Users/artur/Documents/Computer_Vision/ComputerVision/DataSet.db')
db = pd.read_sql_query('select * from DataSet', connection)
examples_data_frames = [pickle.loads(ex) for ex in db['data']]
m = len(examples_data_frames)
for e in examples_data_frames:
    e = e.reshape(1, 400)
x = np.ones(m * 400).reshape(m, 400)
for it in range(m):
    x[it, :] = examples_data_frames[it].reshape(1, 400)

# settings
iteration_number = 100
lambda_parameter = 2
alpha = 0.01

Theta1 = np.random.rand(401 * 20).reshape(20, 401)
Theta2 = np.random.rand(21 * 10).reshape(10, 21)
y = np.array([ex for ex in db['label']]).reshape(m, 1)
costs, Theta1, Theta2 = FitNeuralNetwork.fit(Theta1, Theta2, x, y, iteration_number, lambda_parameter, alpha)

# print('After learning parameters. Theta1 = {} \n Theta2={}'.format(Theta1, Theta2))

x = np.arange(iteration_number)
plt.title('Cost function over per iteration')
plt.plot(x, costs)
plt.show()
