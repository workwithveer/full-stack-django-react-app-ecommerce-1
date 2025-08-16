from rest_framework import serializers

from .models import ProductPromotionEvent, PromotionEvent
from products.serializers import ProductSerializer


class PromotionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionEvent
        fields = '__all__'


class ProductPromotionEventSerializer(serializers.ModelSerializer):
    promotion = PromotionEventSerializer(read_only=True, source='promotion_event')
    product = ProductSerializer(read_only=True)
    class Meta:
        model = ProductPromotionEvent
        fields = ['id', 'promotion', 'product']
