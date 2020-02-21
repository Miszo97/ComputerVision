import numpy as np

sigmoid = lambda h: 1 / (1 + np.e ** -h)
addOneColumn = lambda a: np.c_[np.ones(shape=(a.shape[0], 1)), a]
addOneRow = lambda a: np.r_[np.ones(shape=(1, a.shape[1])), a]
gSigmoid = lambda z: np.multiply(sigmoid(z), (1 - sigmoid(z)))


def nnCostFunction(Theta1, Theta2, X, y, l):
    m = X.shape[0]
    nl = Theta2.shape[0]  # number of labels
    a1 = X
    a1 = addOneColumn(a1)  # add bias term

    z2 = Theta1.dot(a1.T)
    a2 = sigmoid(z2)

    a2 = addOneRow(a2)
    z3 = Theta2 @ a2

    a3 = sigmoid(z3)

    predictions = a3.T

    Y = np.zeros(m * nl)
    Y = Y.reshape(m, nl)
    for i in range(m):
        Y[i, (y[i] - 1)] = 1

    exp1 = np.multiply(np.log(predictions), Y)
    exp2 = np.multiply(np.log(1 - predictions), (1 - Y))

    reg = (l / (2 * m)) * (sum(sum(Theta1[:, 1:] ** 2)) + sum(sum(Theta2[:, 1:] ** 2)))
    J = (1 / m) * np.sum(-exp1 - exp2) + reg;

    delta_3 = a3.T - Y
    delta_2 = delta_3.dot(Theta2[:, 1:])
    delta_2 = np.multiply(delta_2, gSigmoid(z2.T))

    Delta_1 = delta_2.T.dot(a1)
    Delta_2 = delta_3.T.dot(a2.T)

    Theta1_grad = (1 / m) * Delta_1;
    Theta2_grad = (1 / m) * Delta_2;

    Theta1[:, 0] = 0;
    Theta2[:, 0] = 0;

    Theta1_grad = Theta1_grad + (Theta1 * (l / m))
    Theta2_grad = Theta2_grad + (Theta2 * (l / m))

    return J, Theta1_grad, Theta2_grad
