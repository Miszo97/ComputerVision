import os

from django.http import FileResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from Machine_learning.algorithms.helpers import convert_image
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import UserExample
from .serializers import UserExampleSerializer, ModelExampleSerializer

DATABASES = ["ComputerVision/DataSet.db", "DataSet2.db"]


class ListUsersExamples(APIView):
    def get(self, request):
        user_examples = UserExample.objects.all()
        serializer = UserExampleSerializer(user_examples, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = UserExampleSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


class ModelExamples(APIView):
    # Model examples gets from selected user examples
    def post(self, request):
        data = JSONParser().parse(request)

        selected_user_examples = UserExample.objects.filter(id__in=data['ids'])
        serializer = UserExampleSerializer(selected_user_examples, many=True)
        d = serializer.data

        # Convert image to to the format the classifier is expecting.
        for u in d:
            u['converted_image'] = convert_image(u.drawing_base64)

        data = JSONParser().parse(d)
        serializer = ModelExampleSerializer(data=data, many=True)

        if serializer.is_valid():
            serializer.save()
            selected_user_examples.delete()
            return JsonResponse(serializer.data, status=201, safe=False)

        return JsonResponse(serializer.errors, status=400)

    def delete(self, request):
        data = JSONParser().parse(request)
        for id in data["ids"]:
            element = UserExample.objects.filter(id=id)
            element.delete()
            return JsonResponse({"result": "deleted"})


@csrf_exempt
def model(request):
    return render(
        request, "number_recognition/tfjs_model/model.json"
    )


@csrf_exempt
def weights(request):
    cwd_path = os.path.abspath(os.path.dirname(__file__))
    model_path = os.path.join(
        cwd_path, "./templates/number_recognition/tfjs_model/group1-shard1of1.bin"
    )
    model_weights = open(model_path, "rb")
    response = FileResponse(model_weights)
    return response
