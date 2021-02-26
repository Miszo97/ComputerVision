from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@csrf_exempt
def index(request, *args, **kwargs):
    return render(request, "number_recognition_frontend/index.html")
