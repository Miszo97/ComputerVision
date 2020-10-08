import numpy as np

from .cost_function import cost_function
from .helperspy import fetch_data_set, split, shuffle_data
import matplotlib.pyplot as plt
from .fit_neural_network import fit


def cost_function_over_number_of_examaple(examples_numbers, Theta1, Theta2):
    error_train = []
    error_val = []
    for n in examples_numbers:
        x_temp = x[:n]
        y_temp = y[:n]
        costs, theta1, theta2 = fit(Theta1, Theta2, x_temp, y_temp,
                                    print_status=False, alpha=0.2, iteration_number=5000, l=0.02)
        val_cost = cost_function(theta1, theta2, x_val, y_val, 0)
        training_cost = cost_function(theta1, theta2, x_temp, y_temp, 0)
        error_val.append(val_cost)
        error_train.append(training_cost)
        print(len(x_temp))
        print(training_cost)

    return error_val, error_train


def cost_function_over_different_lambda_values(lambda_parameters, Theta1, Theta2):
    error_train = []
    error_val = []
    x_temp = x[:1000]
    y_temp = y[:1000]
    for lam in lambda_parameters:
        costs, theta1, theta2 = fit(Theta1, Theta2, x, y, l=lam,
                                    print_status=True, alpha=0.2, iteration_number=5000)
        training_cost = cost_function(theta1, theta2, x_temp, y_temp, 0)
        val_cost = cost_function(theta1, theta2, x_val, y_val, 0)
        error_val.append(val_cost)
        error_train.append(training_cost)

    return error_val, error_train


x, y, m = fetch_data_set(50)

x, y = shuffle_data(x, y)

x, x_val, x_test = split(x, [90, 95])
y, y_val, y_test = split(y, [90, 95])

hidden_layer_size = 50
Theta1 = (np.random.rand(401 * hidden_layer_size) * 2 - 1).reshape(hidden_layer_size, 401)
Theta2 = (np.random.rand((hidden_layer_size + 1) * 10) * 2 - 1).reshape(10, hidden_layer_size + 1)

# settings
iteration_number = 500
lambda_parameter = 0.3
alpha = 0.2

lambda_parameters = [0, 0.01, 0.02, 0.04, 0.08, 0.16, 0.32, 0.64, 1.28, 2.56, 5.12, 10.24]
examples_number = [1, 5, 50, 100, 200, 500, 1000]

error_val, error_train = cost_function_over_number_of_examaple(examples_number, Theta1, Theta2)

plt.plot(examples_number, error_val, 'g')
plt.plot(examples_number, error_train, 'b')
plt.show()
