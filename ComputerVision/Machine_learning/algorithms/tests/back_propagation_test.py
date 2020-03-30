import numpy as np
from back_propagation import nnCostFunction

X = np.array([[0.54030231, -0.41614684],
              [-0.9899925, -0.65364362],
              [0.28366219, 0.96017029]])

y = np.array([[4],
              [2],
              [3]])
Theta1 = np.array([[0.1, 0.3, 0.5],
                   [0.2, 0.4, 0.6]])

Theta2 = np.array([[0.70000, 1.10000, 1.50000],
                   [0.80000, 1.20000, 1.60000],
                   [0.90000, 1.30000, 1.70000],
                   [1.00000, 1.40000, 1.80000]])

l = 4

J, Theta1_grad, Theta2_grad = nnCostFunction(Theta1, Theta2, X, y, l)

print(J, Theta1_grad, Theta2_grad)
