from django.test import TestCase
from django.db import IntegrityError
from products.models import Category, Product, StockManagement


class CategoryModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Test Category", slug="test-category")

    def test_category_model_creation(self):
        self.assertEqual(self.category.name, "Test Category")
        self.assertEqual(self.category.slug, "test-category")

    def test_category_model_str(self):
        self.assertEqual(str(self.category), "1-Test Category")
        

class ProductModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.category = Category.objects.create(name="Test Category", slug="test-category")
        cls.product = Product.objects.create(name="Test Product", slug="test-product", is_active=True, is_digital=False, price=100, category=cls.category)
    
    @classmethod
    def tearDownClass(cls):
        cls.category.delete()
        cls.product.delete()
    
    def test_product_model_creation(self):
        self.assertEqual(self.product.name, "Test Product")
        self.assertEqual(self.product.slug, "test-product")
        self.assertEqual(self.product.is_active, True)
        self.assertEqual(self.product.is_digital, False)
        self.assertEqual(self.product.price, 100)
    
    def test_product_name_unique(self):
        # Test that we can't create a product with the same name (which should be unique)
        with self.assertRaises(IntegrityError):  # Django will raise IntegrityError for unique constraint violations
            Product.objects.create(
                name="Test Product",  # Same name as in setUp
                slug="test-product-2",  # Different slug to avoid slug uniqueness violation
                is_active=True, 
                is_digital=False, 
                price=100, 
                category=self.category
            )
    
    def test_product_price_must_be_greater_than_zero(self):
        with self.assertRaises(IntegrityError):
            Product.objects.create(name="Test Product-2", slug="test-product-2", is_active=True, is_digital=False, price=0, category=self.category)

class StockManagementModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Test Category", slug="test-category")
        self.product = Product.objects.create(name="Test Product", slug="test-product", is_active=True, is_digital=False, price=100, category=self.category)
        self.stock_management = StockManagement.objects.create(product=self.product, quantity=100)
    
    def test_stock_management_model_creation(self):
        self.assertEqual(self.stock_management.product, self.product)
        self.assertEqual(self.stock_management.quantity, 100)

    def test_stock_management_model_str(self):
        self.assertEqual(str(self.stock_management), "Stock: Test Product – 100 units")
