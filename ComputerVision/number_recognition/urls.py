from django.urls import path

from . import views

app_name = 'number_recognition'

urlpatterns = [
    path('', views.index, name='index'),
    path('feed_model', views.feed_model, name='feed_model'),
    path('send_drawing', views.send_drawing, name='send_drawing'),
    path('examples_selection', views.examples_selection, name='examples_selection'),
]
