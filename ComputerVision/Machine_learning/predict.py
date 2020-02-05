import numpy as np

sigmoid = lambda h: 1 / (1 + np.e ** h)
addOneColumn = lambda a: np.c_[np.ones(shape=(a.shape[0], 1)), a]
addOneRow = lambda a: np.r_[np.ones(shape=(1, a.shape[1])), a]
gSigmoid = lambda z: sigmoid(z) + (1 - sigmoid(z))


def predict(Theta1, Theta2, X):
    """
    The following function performs feed-forward propagation to predict final value
    a - activation layer
    """
    m = X.size()

    a1 = X
    a1 = addOneColumn(a1)  # add bias term

    z2 = Theta1 @ a1.T
    a2 = sigmoid(z2)

    a2 = addOneRow(a2)
    z3 = Theta2 @ a2

    a3 = sigmoid(z3)

    predictions = a3

    return max(a3)
