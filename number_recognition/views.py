import os
import pickle
import sqlite3

import pandas as pd
from django.http import FileResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Machine_learning.algorithms.helpers import convertImage
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import UserExample
from .serializers import UserExampleSerializer

DATABASES = ["ComputerVision/DataSet.db", "DataSet2.db"]


class ListUsersExamples(APIView):
    def get(self, request):
        userExamples = UserExample.objects.all()
        serializer = UserExampleSerializer(userExamples, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = UserExampleSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


class ExampleSelectionRequest(APIView):
    def post(self, request):
        data = JSONParser().parse(request)

        if data["command"] == "accept":
            conn = sqlite3.connect(DATABASES[0])
            for id in data["ids"]:
                elements = UserExample.objects.filter(id=id)
                e = elements.first()

                # Convert image to to the format the classifier is expecting.
                norm_image = convertImage(e.drawing_base64)

                # Save the example in a table format ready to be stored in a database.
                df = pd.DataFrame(
                    {
                        "data": [pickle.dumps(norm_image)],
                        "label": [e.label],
                        "base_64": [e.drawing_base64],
                    }
                )

                df.to_sql("DataSet", conn, if_exists="append", index=False)
                elements.delete()

            conn.close()

            return JsonResponse({"result": "accepted"})

        elif data["command"] == "reject":
            for id in data["ids"]:
                element = UserExample.objects.filter(id=id)
                element.delete()
                return JsonResponse({"result": "deleted"})

        else:
            return ""


@csrf_exempt
def request_a_model(request):
    return render(request, "number_recognition/tfjs_model/model.json")


@csrf_exempt
def group1_shard1of1_bin(request):
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(
        my_path, "./templates/number_recognition/tfjs_model/group1-shard1of1.bin"
    )
    print(path)
    weights = open(path, "rb")
    response = FileResponse(weights)
    return response
