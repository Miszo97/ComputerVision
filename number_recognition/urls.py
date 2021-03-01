from django.urls import path

from .views import ListUsersExamples, ModelExamples
from . import views

app_name = "number_recognition"

urlpatterns = [
    path("user-examples", ListUsersExamples.as_view(), name="user_examples"),
    path(
        "model-examples",
        ModelExamples.as_view(),
        name="model_examples",
    ),
    path("model", views.model, name="model"),
    path(
        "group1-shard1of1.bin", views.weights, name="weights"
    ),
]
