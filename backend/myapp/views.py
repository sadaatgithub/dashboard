from django.http import HttpResponse
from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet,GenericViewSet
from .models import PatientImage, pwh, User
from .models import pwh

from .serializers import PwhSerializer,PatientImageSerializer,PwhTagSerializer,ChapterSerializer,PwhTagSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.mixins import RetrieveModelMixin,UpdateModelMixin,CreateModelMixin

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


class PatientImageViewSet(ModelViewSet):
    serializer_class = PatientImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        return {'patient_id':self.kwargs['patient_pk']}


    def get_queryset(self):
        return PatientImage.objects.filter(patient_id=self.kwargs['patient_pk'])

class PatientTagsViewSet(CreateModelMixin,UpdateModelMixin, GenericViewSet):
    serializer_class = PwhTagSerializer
    
    def  get_serializer_context(self):
        return {'patient_id':self.kwargs['patient_pk']}

    def get_queryset(self):
        return pwh.objects.filter(id=self.kwargs['patient_pk'])