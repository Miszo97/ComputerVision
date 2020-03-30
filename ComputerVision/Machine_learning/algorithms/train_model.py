import numpy as np
import pandas as pd

from fit_neural_network import fit
from cost_function import cost_function
from predict import predict, get_predicted_number
from helpers import saveThetaParameters, get_accuracy, fetch_data_set, shuffle_data, split

x, y, m = fetch_data_set(percent=100)

x, y = shuffle_data(x, y)

# settings
max_iteration_number = 400
lambda_parameter = 2
save_after_training = False

hidden_layer_size = 20
input_layer_size = 401

Theta1 = (np.random.rand(input_layer_size * hidden_layer_size) * 2 - 1).reshape(hidden_layer_size, input_layer_size)
Theta2 = (np.random.rand((hidden_layer_size + 1) * 10) * 2 - 1).reshape(10, hidden_layer_size + 1)

x, x_val, x_test = split(x, [80, 99])
y, y_val, y_test = split(y, [80, 99])

print("Start optimization with \n lambda = {} \n max_iteration_number = {} \n examples = {}".format(
    lambda_parameter,
    max_iteration_number, m))

Theta1, Theta2 = fit([Theta1, Theta2], x, y, max_iteration_number, lambda_parameter)

predictions = predict(Theta1, Theta2, x_val)
predicted_numbers = get_predicted_number(predictions)
corretness = np.array(predicted_numbers).reshape(y_val.shape) == y_val
results = np.c_[predictions, predicted_numbers, y_val, corretness]
results_to_show = pd.DataFrame(results, columns=[1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
                                                 'Predicted Value', 'Actual value', 'Correct value'])

print("Results")
print(results_to_show)

val_cost = cost_function([Theta1, Theta2], x_val, y_val, 0)
training_cost = cost_function([Theta1, Theta2], x, y, 0)
print(training_cost)
print(val_cost)

accuracy = get_accuracy(predicted_numbers, list(y_val))
print("accuracy = {}".format(accuracy))

if save_after_training:
    saveThetaParameters('theta_parameters.npz', Theta1, Theta2)
