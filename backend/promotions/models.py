from django.db import models
from products.models import Product

# Display DiscountLevel choices
# Choices are used to limit the values that can be assigned to a field
class DiscountLevel(models.IntegerChoices):
    TEN = 10, "10%"
    TWENTY = 20, "20%"
    FIFTY = 50, "50%"

# Display Relationship between PromotionEvent and Product
# One-to-Many relationship where each promotion event can have multiple products
class PromotionEvent(models.Model):
    name = models.CharField(max_length=50, unique=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    price_reduction = models.IntegerField(choices=DiscountLevel.choices)
    class Meta:
        ordering = ["-start_date"]
    def __str__(self):
        return self.name

# Display Relationship between Product and PromotionEvent
# Many-to-Many relationship where each product can have multiple promotion events and each promotion event can have multiple products
class ProductPromotionEvent(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    promotion_event = models.ForeignKey(PromotionEvent, on_delete=models.CASCADE)
    class Meta:
        unique_together = ("product", "promotion_event")
    def __str__(self):
        return f"{self.product.name} – {self.promotion_event.name}"