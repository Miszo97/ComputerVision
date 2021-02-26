from django.db import models


# Create your models here.


class User_Example(models.Model):
    drawing_base64 = models.TextField()
    label = models.IntegerField(default=0)
