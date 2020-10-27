from django.urls import path

from . import views

app_name = 'number_recognition'

urlpatterns = [
    path('', views.index, name='index'),
    path('feed_model', views.feed_model, name='feed_model'),
    path('predict_number', views.predict_number, name='predict_number'),
    path('send_drawing', views.send_drawings, name='send_drawings'),
    path('request_a_model', views.request_a_model, name='request_a_model'),
    path('group1-shard1of1.bin', views.group1_shard1of1_bin, name='group1-shard1of1.bin'),
    path('examples_selection', views.examples_selection, name='examples_selection'),
    path('update_examples', views.update_examples, name='update_examples'),

]
