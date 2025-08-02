# Create your models here.
from django.db import models


# Category model to represent product categories
class Category(models.Model):
    parent = models.ForeignKey(
        "self",
        on_delete=models.RESTRICT,
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=55, unique=True)
    is_active = models.BooleanField(default=False)
    level = models.SmallIntegerField(default=0)
    class Meta:
        ordering = ["name"]
    def __str__(self):
        return f"{self.id}-{self.name}"


# One-to-Many relationship between Category and Product where each category can have multiple products    
class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products",
    )
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=55, unique=True)
    description = models.TextField(null=True, blank=True)
    is_digital = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        ordering = ["name"]
    def __str__(self):
        return self.name

# Display Relationship between Product and StockManagement
# One-to-One relationship where each product has a unique stock management record
class StockManagement(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        unique=True,
        related_name="stock",
    )
    quantity = models.IntegerField(default=0)
    last_checked_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"Stock: {self.product.name} – {self.quantity} units"