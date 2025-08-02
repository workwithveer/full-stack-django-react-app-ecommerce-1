from django.contrib import admin

from .models import Category, Product, StockManagement


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'parent', 'is_active', 'level')
    list_filter = ('is_active', 'level', 'parent')
    search_fields = ('id', 'name', 'slug')
    ordering = ('id',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'category', 'price', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active', 'category')
    search_fields = ('id', 'name', 'slug')
    ordering = ('id',)

class StockManagementAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'quantity')
    list_filter = ('product', )
    search_fields = ('id', 'product__name')
    ordering = ('id',)


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(StockManagement, StockManagementAdmin)

# Register your models here.
