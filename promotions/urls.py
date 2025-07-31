from django.urls import include, path
from rest_framework import routers

from .views import PromotionEventViewSet

router = routers.DefaultRouter()
router.register(r'promotion-events', PromotionEventViewSet, basename='promotion-events')

urlpatterns = router.urls