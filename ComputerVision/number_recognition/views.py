# Create your views here.
import os

from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.http import FileResponse
from django.urls import reverse
import sqlite3
import pickle
import pandas as pd
import numpy as np
import json
from tensorflow import keras

from .models import User_Example
from Machine_learning.algorithms.helpers import convertImage

DATABASES = ['DataSet.db', 'DataSet2.db']


def index(request):
    return render(request, 'number_recognition/index.html')


def feed_model(request):
    return render(request, 'number_recognition/user_examples_creator.html')


def request_a_model(request):
    return render(request, 'number_recognition/model.json')


def group1_shard1of1_bin(request):
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(my_path, "./templates/number_recognition/group1-shard1of1.bin")
    print(path)
    weights = open(path, 'rb')
    response = FileResponse(weights)
    return response


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
    path = os.path.join(my_path, "../Machine_learning//algorithms/model.h5")
    model = keras.models.load_model(path)
    predictions_single = model.predict(converted_example)
    predicted_number = int(np.argmax(predictions_single))
    response = {'predicted_number': predicted_number}
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
            conn = sqlite3.connect(DATABASES[0])
            for e in examples_to_accept:
                # Convert image to to the format the classifier is expecting.
                norm_image = convertImage(e.drawing_base64)

                # Save the example in a table format ready to be stored in a database.
                df = pd.DataFrame(
                    {'data': [pickle.dumps(norm_image)], 'label': [e.label], 'base_64': [e.drawing_base64]})

                df.to_sql('DataSet', conn, if_exists='append', index=False)

            conn.close()

    return HttpResponseRedirect(reverse('number_recognition:examples_selection'))
