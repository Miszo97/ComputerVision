from django.db import models


class UserExample(models.Model):
    drawing_base64 = models.TextField()
    label = models.IntegerField()

class ModelExample(models.Model):
    drawing_base64 = models.TextField()
    label = models.IntegerField()
    converted_image = models.TextField()
