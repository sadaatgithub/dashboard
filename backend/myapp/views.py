from django.http import HttpResponse
from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from myapp.models import pwh

from myapp.serializers import PwhSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


def home(request):
    return HttpResponse("Ok")
class PwhViewSet(ModelViewSet):
    serializer_class = PwhSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return pwh.objects.filter(chapter=user.id).prefetch_related('pwh_images').all()

    def get_serializer_context(self):
        return {'user_id':self.request.user.id}