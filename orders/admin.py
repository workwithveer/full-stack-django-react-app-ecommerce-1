from django.contrib import admin

from .models import Order, OrderProduct

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('user__username', 'user__email')
    ordering = ('-created_at',)

class OrderProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity')
    list_filter = ('order__user', 'product__category')
    search_fields = ('order__user__username', 'product__name')
    ordering = ('-order__created_at',)

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct, OrderProductAdmin)
