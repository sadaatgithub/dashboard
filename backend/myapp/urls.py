


from django.urls import path
from .import views
from rest_framework_nested import routers


router = routers.DefaultRouter()
router.register('api', views.PwhViewSet, basename='home')



# urlpatterns = router.urls

urlpatterns = [
    path('', views.home),
] + router.urls