
# from custom_scripts.load_data_from_csv import load_category_data
# load_category_data()

def load_category_data():
    import csv

    from products.models import Category
    with open('./data/category.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            print(row['id'], row['parent_id'], row['name'], row['slug'], row['is_active'], row['level'])
            category = Category(
                parent_id=row['parent_id'] if row['parent_id'] else None,
                name=row['name'],
                slug=row['slug'],
                is_active=row['is_active'],
                level=row['level']
            )
            category.save()

    print(Category.objects.all())
    
    
# seed data for products table
# from custom_scripts.load_data_from_csv import load_product_data;
# load_product_data()

def load_product_data():
    import csv

    from products.models import Product

    with open('./data/product.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            #print(row['name'], row['slug'], row['category_id'], row['description'], row['is_digital'], row['is_active'], row['created_at'], row['updated_at'], row['price'])
            product = Product(
                name=row['name'],
                slug=row['slug'],
                category_id=row['category_id'],
                description=row['description'],
                is_digital=row['is_digital'],
                is_active=row['is_active'],
                created_at=row['created_at'],
                updated_at=row['updated_at'],
                price=float(row['price'])
            )
            product.save()

    print(Product.objects.all())
    
    

# seed data for stock management table
# from custom_scripts.load_data_from_csv import load_stock_management_data
# load_stock_management_data()

def load_stock_management_data():
    import csv
    from products.models import StockManagement

    with open('./data/stockmanagement.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Only process if product_id exists and is not empty
            if row['product_id'] and row['product_id'].strip():
                stock = StockManagement(
                    product_id=row['product_id'],
                    quantity=int(row['quantity']),
                    last_checked_at=row['last_checked_at']
                )
                stock.save()
            else:
                print(f"Skipping row with invalid product_id: {row}")

    print(StockManagement.objects.all())

# seed data for promotion event table
# from custom_scripts.load_data_from_csv import load_promotion_event_data
# load_promotion_event_data()

def load_promotion_event_data():
    import csv
    from promotions.models import PromotionEvent

    with open('./data/promotionevent.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            promotion_event = PromotionEvent(
                name=row['name'],
                start_date=row['start_date'],
                end_date=row['end_date'],
                price_reduction=row['price_reduction']
            )
            promotion_event.save()

    print(PromotionEvent.objects.all())

# seed data for product promotion event table
# from custom_scripts.load_data_from_csv import load_product_promotion_event_data
# load_product_promotion_event_data()

def load_product_promotion_event_data():
    import csv
    from promotions.models import ProductPromotionEvent

    with open('./data/productpromotionevent.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            product_promotion_event = ProductPromotionEvent(
                product_id=row['product_id'],
                promotion_event_id=row['promotion_event_id']
            )
            product_promotion_event.save()

    print(ProductPromotionEvent.objects.all())


