from django.urls import include, path
from rest_framework import routers

from .views import CategoryViewSet, ProductViewSet, StockManagementViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'stock', StockManagementViewSet, basename='stock')

urlpatterns = router.urls