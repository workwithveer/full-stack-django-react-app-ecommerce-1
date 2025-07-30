from rest_framework import viewsets

from .models import Category, Product, StockManagement
from .serializers import (CategorySerializer, ProductSerializer,
                          StockManagementSerializer)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class StockManagementViewSet(viewsets.ModelViewSet):
    queryset = StockManagement.objects.all()
    serializer_class = StockManagementSerializer