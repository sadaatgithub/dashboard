


from django.urls import path
from .import views
from rest_framework_nested import routers


router = routers.DefaultRouter()
router.register('api', views.PwhViewSet, basename='home')
patient_image_router = routers.NestedDefaultRouter(router,'api', lookup='patient')

patient_tags_router = routers.NestedDefaultRouter(router,'api',lookup='patient')
patient_image_router.register('patient_image', views.PatientImageViewSet, basename='patient-image')
patient_tags_router.register('patient_tags', views.PatientTagsViewSet, basename='patient-tags')



# urlpatterns = router.urls

urlpatterns = [
    path('', views.home),
] + router.urls + patient_image_router.urls + patient_tags_router.urls