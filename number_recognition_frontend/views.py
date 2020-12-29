from django.shortcuts import render
from django.urls import path, include

# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'number_recognition_frontend/index.html')