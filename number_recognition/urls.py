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
        "weights", views.weights, name="weights"
    ),
]
