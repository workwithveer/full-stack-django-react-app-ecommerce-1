from django.urls import include, path
from rest_framework import routers

from .views import ProductPromotionEventViewSet, PromotionEventViewSet

router = routers.DefaultRouter()
router.register(r'promotion-events', PromotionEventViewSet, basename='promotion-events')
router.register(r'product-promotion-events', ProductPromotionEventViewSet, basename='product-promotion-events')

urlpatterns = router.urls