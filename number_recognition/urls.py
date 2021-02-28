from django.urls import path

from .views import ListUsersExamples, ExampleSelectionRequest
from . import views

app_name = "number_recognition"

urlpatterns = [
    path("userexamples", ListUsersExamples.as_view(), name="UserExamples"),
    path(
        "exampleselectionrequest",
        ExampleSelectionRequest.as_view(),
        name="handle_example_selection_request",
    ),
    path("request_a_model", views.request_a_model, name="request_a_model"),
    path(
        "group1-shard1of1.bin", views.group1_shard1of1_bin, name="group1-shard1of1.bin"
    ),
]
