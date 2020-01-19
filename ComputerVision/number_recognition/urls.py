from django.urls import path

from . import views

app_name = 'number_recognition'

urlpatterns = [
    path('', views.index, name='index'),
    path('send_drawing', views.send_drawing, name='send_drawing'),
]
