from django.contrib import admin

from .models import Category, Product, StockManagement

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(StockManagement)

# Register your models here.
