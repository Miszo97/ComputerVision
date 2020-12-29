from rest_framework import serializers
from .models import User_Example

class UserExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Example
        fields = ('id', 'drawing_base64', 'label')