import pickle
import sqlite3

import numpy as np
import pandas as pd

from exceptions import DifferentLenghtError, ZeroElementsListError


def shuffle_data(x, y):
    m = len(x)
    concatenated = np.c_[x, y]
    np.random.shuffle(concatenated)
    x = concatenated[:, :-1].reshape(m, 400)
    y = concatenated[:, -1].reshape(m, 1).astype(int)
    return x, y


# prepare
def fetch_data_set(percent=100):
    connection = sqlite3.connect('/Users/artur/Documents/Computer_Vision/ComputerVision/DataSet.db')
    db = pd.read_sql_query('select * from DataSet', connection)
    db_len = len(db)
    examples_number_to_return = int((percent * 1 / 100) * db_len)
    db = db[:examples_number_to_return]
    m = len(db)
    x = np.array([pickle.loads(ex) for ex in db['data']]).reshape(m, 400)
    y = np.array(db['label']).reshape(m, 1)

    return x, y, m


def split(a, l):
    l = sorted(l)
    l = [int(i / 100 * len(a)) for i in l]
    splited = []
    p = 0
    for i in l:
        splited.append(a[p:i, :])
        p = i
    splited.append(a[i:, :])
    return splited


def saveThetaParameters(file, theta1, theta2):
    np.savez(file, theta1=theta1, theta2=theta2)


def loadThetaParameters(file):
    theta_parameters = np.load(file)
    return theta_parameters['theta1'], theta_parameters['theta2']


def get_accuracy(predicted, actual):
    if len(predicted) != len(actual):
        raise DifferentLenghtError
    elif (len(predicted) == 0) or (len(actual) == 0):
        raise ZeroElementsListError
    else:
        matches = 0
        for p, a in zip(predicted, actual):
            if p == a:
                matches += 1
        return 100 * matches / len(actual)
