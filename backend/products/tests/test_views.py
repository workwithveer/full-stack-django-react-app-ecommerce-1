from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

from products.models import Category, Product



class TestSetupp(TestCase):
    
    def setUp(self):
        


class ProductViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name="Test Category", slug="test-category")
        self.product = Product.objects.create(name="Test Product", slug="test-product", is_active=True, is_digital=False, price=100, category=self.category)
    
    def test_list_products(self):
        response = self.client.get(reverse("product-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Test Product")
        
    def test_create_product(self):
        response = self.client.post(reverse("product-list"), {
            "name": "New Product",
            "slug": "new-product",
            "is_active": True,
            "is_digital": False,
            "price": 100,
            "category": self.category.id
        })
         # Debug: Print response data if it fails
        if response.status_code != status.HTTP_201_CREATED:
            print(f"Response status: {response.status_code}")
            print(f"Response data: {response.data}")
        
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)