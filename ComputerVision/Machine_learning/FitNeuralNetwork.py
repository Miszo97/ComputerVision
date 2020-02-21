from Machine_learning.back_propagation import nnCostFunction


def gradient_descent(Theta1, Theta2, Theta1_grad, Theta2_grad, alpha):
    Theta1 = Theta1 - alpha * Theta1_grad
    Theta2 = Theta2 - alpha * Theta2_grad
    return Theta1, Theta2


def fit(Theta1, Theta2, X, y, iteration_number=50, l=4, alpha=0.01):
    "Optimize neural network parameters to find minimum of cost function"

    costs = []  # cost on each iteration

    for i in range(iteration_number):
        J, Theta1_grad, Theta2_grad = nnCostFunction(Theta1, Theta2, X, y, l)
        costs.append(J)
        print('Cost function: iteration: {}, cost: {}'.format(i + 1, J))
        Theta1, Theta2 = gradient_descent(Theta1, Theta2, Theta1_grad, Theta2_grad, alpha)

    return costs, Theta1, Theta2
