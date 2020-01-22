# Create your views here.

from PIL import Image
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
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
    image_b64 = request.POST['canvas']
    # with io.StringIO(image_b64) as f:
    #     print(f.read(100))
    imgstr = re.search(r'base64,(.*)', image_b64).group(1)
    image_bytes = io.BytesIO(base64.b64decode(imgstr))
    im = Image.open(image_bytes)
    arr = np.array(im)[:, :, 0]

    example = User_Example(drawing_base64=request.POST['canvas'], label=request.POST['typed_number'])
    example.save()
    return HttpResponseRedirect(reverse('number_recognition:feed_model'))


def examples_selection(request):
    examples = User_Example.objects.all()

    return render(request, 'number_recognition/examples_selections.html', context={"examples": examples})
