import numpy as np
from scipy import optimize

from cost_function import cost_function
from back_propagation import nnCostFunction


def fit(theta, X, y, max_iteration_number=50, l=0):
    """Optimize neural network parameters to find the minimum of the cost function"""

    theta1, theta2 = theta
    theta1_size = theta1.size
    theta1_shape = theta1.shape
    args = (theta1_size, theta1_shape, theta2.shape)

    def gradf(x, *args):
        theta1_size = args[0]
        theta1 = x[:theta1_size].reshape(args[1])
        theta2 = x[theta1_size:].reshape(args[2])
        J, theta1, theta2 = nnCostFunction(theta1, theta2, X, y, l)
        return np.r_[theta1.flatten(), theta2.flatten()]

    def f(x, *args):
        theta1_size = args[0]
        theta1 = x[:theta1_size].reshape(args[1])
        theta2 = x[theta1_size:].reshape(args[2])
        return cost_function([theta1, theta2], X, y, l)

    x0 = np.r_[theta1.flatten(), theta2.flatten()]  # Initial guess.
    res = optimize.fmin_cg(f, x0, fprime=gradf, maxiter=max_iteration_number, args=args)
    theta1 = res[:theta1.size].reshape(theta1.shape)
    theta2 = res[theta1.size:].reshape(theta2.shape)

    return theta1, theta2
