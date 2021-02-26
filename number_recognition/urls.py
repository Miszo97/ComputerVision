from django.urls import path

from . import views

app_name = "number_recognition"

urlpatterns = [
    path("senduserexamples", views.sendUserExamples, name="sendUserExamples"),
    path(
        "handleexampleselectionrequest",
        views.handleExampleSelectionRequest,
        name="handleexampleselectionrequest",
    ),
    path("request_a_model", views.request_a_model, name="request_a_model"),
    path(
        "group1-shard1of1.bin", views.group1_shard1of1_bin, name="group1-shard1of1.bin"
    ),
]
