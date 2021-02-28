from rest_framework import serializers
from .models import UserExample


class UserExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExample
        fields = ("id", "drawing_base64", "label")
