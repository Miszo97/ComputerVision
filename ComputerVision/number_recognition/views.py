# Create your views here.
import os

from PIL import Image
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import sqlite3
import pickle
import pandas as pd
import numpy as np
import io
import re
import base64
import json

from .models import User_Example
from Machine_learning.helpers import loadThetaParameters
from Machine_learning.predict import predict, get_predicted_number


def index(request):
    return render(request, 'number_recognition/index.html')


def feed_model(request):
    return render(request, 'number_recognition/user_examples_creator.html')


def send_drawings(request):
    examples = json.loads(request.POST['examples'])
    examples_model = [User_Example(drawing_base64=e['dataURL'], label=e['label']) for e in examples]
    User_Example.objects.bulk_create(examples_model)
    return HttpResponseRedirect(reverse('number_recognition:feed_model'))


def predict_number(request):
    user_example = json.loads(request.GET['number_to_predict'])
    converted_example = convertImage(user_example)
    converted_example = converted_example.reshape(1, 400)
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(my_path, "../theta_parameters.npz")
    theta1, theta2 = loadThetaParameters(path)
    predictions = predict(theta1, theta2, converted_example)
    predicted_number = get_predicted_number(predictions)
    response = {'predicted_number': int(predicted_number[0])}
    return JsonResponse(response)


def examples_selection(request):
    examples = User_Example.objects.all()
    return render(request, 'number_recognition/examples_selections.html', context={"examples": examples})


def update_examples(request):
    examples_to_delete_pks = json.loads(request.POST['deleted-examples'])
    try:
        user_examples = User_Example.objects.all()
        examples_to_accept = [e for e in user_examples if e.id not in examples_to_delete_pks]
        User_Example.objects.all().delete()
    except (KeyError, User_Example.DoesNotExist):
        return
    else:
        if len(examples_to_accept) != 0:
            conn = sqlite3.connect('DataSet.db')
            for e in examples_to_accept:
                # Convert image to to the format the classifier is expecting.
                norm_image = convertImage(e.drawing_base64)

                # Save the example in a table format ready to be stored in a database.
                df = pd.DataFrame(
                    {'data': [pickle.dumps(norm_image)], 'label': [e.label], 'base_64': [e.drawing_base64]})

                df.to_sql('DataSet', conn, if_exists='append', index=False)

            conn.close()

    return HttpResponseRedirect(reverse('number_recognition:examples_selection'))


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
    scaled_image = np.array(Image.fromarray(arr).resize((20, 20)))
    # normalization
    min_element = np.min(scaled_image)
    max_element = np.max(scaled_image)
    delta = max_element - min_element
    norm_image = (scaled_image - min_element) / delta

    return norm_image
