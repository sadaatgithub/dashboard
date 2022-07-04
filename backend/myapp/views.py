from django.http import HttpResponse
from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet


# Create your views here.


def home(request):
    return HttpResponse("Ok")
class PwhViewSet(ModelViewSet):
    pass