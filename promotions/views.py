from django.shortcuts import render
from rest_framework import viewsets
from .models import PromotionEvent, ProductPromotionEvent
from .serializers import PromotionEventSerializer, ProductPromotionEventSerializer


class PromotionEventViewSet(viewsets.ModelViewSet):
    queryset = PromotionEvent.objects.all()
    serializer_class = PromotionEventSerializer


class ProductPromotionEventViewSet(viewsets.ModelViewSet):
    queryset = ProductPromotionEvent.objects.all()
    serializer_class = ProductPromotionEventSerializer