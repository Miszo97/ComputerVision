import numpy as np

sigmoid = lambda h: 1 / (1 + np.e ** -h)
addOneColumn = lambda a: np.c_[np.ones(shape=(a.shape[0], 1)), a]
addOneRow = lambda a: np.r_[np.ones(shape=(1, a.shape[1])), a]
gSigmoid = lambda z: np.multiply(sigmoid(z), (1 - sigmoid(z)))


def cost_function(theta, X, y, l):
    theta1, theta2 = theta
    m = X.shape[0]
    nl = theta2.shape[0]  # number of labels
    a1 = X
    a1 = addOneColumn(a1)  # add bias term

    z2 = theta1.dot(a1.T)
    a2 = sigmoid(z2)

    a2 = addOneRow(a2)
    z3 = theta2 @ a2

    a3 = sigmoid(z3)

    predictions = a3.T

    Y = np.zeros(m * nl)
    Y = Y.reshape(m, nl)
    for i in range(m):
        Y[i, (y[i] - 1)] = 1

    exp1 = np.multiply(np.log(predictions), Y)
    exp2 = np.multiply(np.log(1 - predictions), (1 - Y))

    reg = (l / (2 * m)) * (sum(sum(theta1[:, 1:] ** 2)) + sum(sum(theta2[:, 1:] ** 2)))
    J = (1 / m) * np.sum(-exp1 - exp2) + reg

    return J
