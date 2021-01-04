# Create your views here.
import os

from django.http import HttpResponseRedirect, HttpResponse, JsonResponse, FileResponse
from django.shortcuts import render
from django.urls import reverse
import sqlite3
import pickle
import pandas as pd
import numpy as np
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializers import UserExampleSerializer
from .models import User_Example
from Machine_learning.algorithms.helpers import convertImage

DATABASES = ['ComputerVision/DataSet.db', 'DataSet2.db']


@csrf_exempt
def sendUserExamples(request):
    if request.method == 'GET':
        userExamples = User_Example.objects.all()
        serializer = UserExampleSerializer(userExamples, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserExampleSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def handleExampleSelectionRequest(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        # TODO Needs optimation
        if data["command"] == "accept":
            conn = sqlite3.connect(DATABASES[0])
            for id in data["ids"]:
                elements = User_Example.objects.filter(id=id)
                e = elements.first()

                # Convert image to to the format the classifier is expecting.
                norm_image = convertImage(e.drawing_base64)

                # Save the example in a table format ready to be stored in a database.
                df = pd.DataFrame(
                    {'data': [pickle.dumps(norm_image)], 'label': [e.label], 'base_64': [e.drawing_base64]})

                df.to_sql('DataSet', conn, if_exists='append', index=False)
                elements.delete()

            conn.close()

            return JsonResponse({"result": "accepted"})

        elif data["command"] == "reject":
            for id in data["ids"]:
                element = User_Example.objects.filter(id=id)
                element.delete()
                return JsonResponse({"result": "deleted"})

        else:
            return ""


@csrf_exempt
def request_a_model(request):
    return render(request, 'number_recognition/tfjs_model/model.json')

@csrf_exempt
def group1_shard1of1_bin(request):
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(
        my_path, "./templates/number_recognition/tfjs_model/group1-shard1of1.bin")
    print(path)
    weights = open(path, 'rb')
    response = FileResponse(weights)
    return response
