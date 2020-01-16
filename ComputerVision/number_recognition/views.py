from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404


def index(request):
    return render(request, 'number_recognition/index.html')
