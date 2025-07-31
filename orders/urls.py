from django.urls import include, path
from rest_framework import routers

from .views import OrderProductViewSet, OrderViewSet

router = routers.DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-products', OrderProductViewSet)

urlpatterns = router.urls