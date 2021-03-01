from rest_framework import serializers
from .models import UserExample, ModelExample


class UserExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExample
        fields = '__all__'

class ModelExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelExample
        fields = '__all__'
