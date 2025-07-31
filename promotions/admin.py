from django.contrib import admin

# Register your models here.
from .models import ProductPromotionEvent, PromotionEvent

admin.site.register(PromotionEvent)
admin.site.register(ProductPromotionEvent)