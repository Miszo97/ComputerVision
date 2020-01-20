from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse

from .models import User_Example


def index(request):
    return render(request, 'number_recognition/index.html')


def feed_model(request):
    return render(request, 'number_recognition/feed_model.html')


def send_drawing(request):
    example = User_Example(drawing_base64=request.POST['canvas'], label=request.POST['typed_number'])
    example.save()
    return HttpResponseRedirect(reverse('number_recognition:feed_model'))
