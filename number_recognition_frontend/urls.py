from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("feedmodel", index),
    path("exampleselection", index),
]
