from django.db import models
from django.db.models import fields
from rest_framework import serializers


# Create your models here.


class User_Example(models.Model):
    drawing_base64 = models.TextField()
    label = models.IntegerField(default=0)

class UserExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Example
        fields = ('drawing_base64', 'label')