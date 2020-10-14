from django.urls import path

from . import views

app_name = 'number_recognition'

urlpatterns = [
    path('', views.index, name='index'),
    path('feed_model', views.feed_model, name='feed_model'),
    path('predict_number', views.predict_number, name='predict_number'),
    path('send_drawing', views.send_drawings, name='send_drawings'),
    path('request_a_model', views.request_a_model, name='request_a_model'),
    path('examples_selection', views.examples_selection, name='examples_selection'),
    path('update_examples', views.update_examples, name='update_examples'),

]
