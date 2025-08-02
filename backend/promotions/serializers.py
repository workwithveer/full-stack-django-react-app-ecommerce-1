from rest_framework import serializers
from .models import PromotionEvent, ProductPromotionEvent


class PromotionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionEvent
        fields = '__all__'


class ProductPromotionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPromotionEvent
        fields = '__all__'