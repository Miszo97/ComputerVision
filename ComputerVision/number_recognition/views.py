# Create your views here.

from PIL import Image
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
import sqlite3
import pickle
import pandas as pd
import numpy as np
import io
import re
import base64

from .models import User_Example


def index(request):
    return render(request, 'number_recognition/index.html')


def feed_model(request):
    return render(request, 'number_recognition/feed_model.html')


def send_drawing(request):
    example = User_Example(drawing_base64=request.POST['canvas'], label=request.POST['typed_number'])
    example.save()
    return HttpResponseRedirect(reverse('number_recognition:feed_model'))


def examples_selection(request):
    examples = User_Example.objects.all()
    return render(request, 'number_recognition/examples_selections.html', context={"examples": examples})


def accept_example(drawing_id):
    try:
        example_to_accept = User_Example.objects.get(pk=drawing_id)
    except (KeyError, User_Example.DoesNotExist):
        return
    else:
        image_b64 = example_to_accept.drawing_base64
        label = example_to_accept.label
        imgstr = re.search(r'base64,(.*)', image_b64).group(1)
        image_bytes = io.BytesIO(base64.b64decode(imgstr))
        im = Image.open(image_bytes)
        arr = np.array(im)[:, :, 0]

        scaled_image = np.array(Image.fromarray(arr).resize((20, 20)))

        df = pd.DataFrame({'data': [pickle.dumps(scaled_image)], 'label': [label], 'base_64': [image_b64]})

        conn = sqlite3.connect('DataSet.db')
        df.to_sql('DataSet', conn, if_exists='append', index=False)
        conn.close()

        example_to_accept.delete()

        print('accept')


def discard_example(drawing_id):
    print('discard')
    try:
        example_to_delete = User_Example.objects.get(pk=drawing_id)
    except (KeyError, User_Example.DoesNotExist):
        return
    else:
        example_to_delete.delete()


def handle_example(request):
    drawing_id = request.POST['drawing_id']
    command = request.POST['command']
    if command == 'accept':
        accept_example(drawing_id)
    if command == 'discard':
        discard_example(drawing_id)
    return HttpResponseRedirect(reverse('number_recognition:examples_selection'))
