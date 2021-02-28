from django.db import models


# Create your models here.


class UserExample(models.Model):
    drawing_base64 = models.TextField()
    label = models.IntegerField(default=0)
