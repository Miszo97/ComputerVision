import pickle
import io
import re
import base64
import sqlite3

from PIL import Image
import numpy as np
import pandas as pd

import io
import re
import base64

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
    x = np.array([pickle.loads(ex) for ex in db['data']])
    x = x.reshape(m, 400)
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


def convertImage(e):
    """
    Convert image to to the format the classifier is expecting.
    Specifically 20x20 matrix with values in range 0 to 1.
    """

    image_b64 = e
    imgstr = re.search(r'base64,(.*)', image_b64).group(1)
    image_bytes = io.BytesIO(base64.b64decode(imgstr))
    im = Image.open(image_bytes)
    arr = np.array(im)[:, :, 0]
    arr = crop(arr)
    scaled_image = np.array(Image.fromarray(arr).resize((20, 20)))
    # normalization
    min_element = np.min(scaled_image)
    max_element = np.max(scaled_image)
    delta = max_element - min_element
    norm_image = (scaled_image - min_element) / delta

    return norm_image


def first_pixel(o, ar):
    if o is 'up':
        for i in range(ar.shape[0]):
            if np.where(ar[i, 0:] != 0)[0].size: return i
    if o is 'down':
        for i in range(ar.shape[0]):
            if np.where(ar[-1 - i, 0:] != 0)[0].size: return ar.shape[0] - 1 - i
    if o is 'left':
        for i in range(ar.shape[1]):
            if np.where(ar[0:, i] != 0)[0].size: return i
    if o is 'right':
        for i in range(ar.shape[1]):
            if np.where(ar[0:, -1 - i] != 0)[0].size: return ar.shape[1] - 1 - i


def crop(ar):
    left_border = first_pixel('left', ar)
    right_border = first_pixel('right', ar)
    top_border = first_pixel('up', ar)
    bottom_border = first_pixel('down', ar)

    cropped_array = ar[top_border:bottom_border + 1, left_border:right_border + 1]

    return cropped_array
