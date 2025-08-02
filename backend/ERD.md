# Entity Relationship Diagram - E-commerce Application

## Database Schema Overview

### 1. Category Entity

```
┌─────────────────────────────────────┐
│              Category               │
├─────────────────────────────────────┤
│ PK  id          : Integer          │
│ FK  parent_id   : Integer (self)   │
│     name        : CharField(50)    │
│     slug        : SlugField(55)    │
│     is_active   : Boolean          │
│     level       : SmallInteger     │
└─────────────────────────────────────┘
```

**Description:**

- Represents product categories with hierarchical structure
- Self-referencing relationship allows for parent-child category hierarchy
- `level` field tracks the depth in the category tree
- `slug` provides URL-friendly identifiers
- `is_active` controls category visibility

### 2. Product Entity

```
┌─────────────────────────────────────┐
│              Product                │
├─────────────────────────────────────┤
│ PK  id          : Integer          │
│ FK  category_id : Integer          │
│     name        : CharField(50)    │
│     slug        : SlugField(55)    │
│     description : TextField        │
│     is_digital  : Boolean          │
│     is_active   : Boolean          │
│     created_at  : DateTimeField    │
│     updated_at  : DateTimeField    │
│     price       : DecimalField     │
└─────────────────────────────────────┘
```

**Description:**

- Core product information
- Each product belongs to exactly one category
- `is_digital` distinguishes between physical and digital products
- `price` stored as decimal for precision
- Timestamps for creation and updates

### 3. StockManagement Entity

```
┌─────────────────────────────────────┐
│          StockManagement            │
├─────────────────────────────────────┤
│ PK  id              : Integer      │
│ FK  product_id      : Integer      │
│     quantity        : Integer      │
│     last_checked_at : DateTimeField│
└─────────────────────────────────────┘
```

**Description:**

- Tracks inventory levels for each product
- One-to-one relationship with Product
- `quantity` represents current stock level
- `last_checked_at` tracks when inventory was last updated

### 4. PromotionEvent Entity

```
┌─────────────────────────────────────┐
│           PromotionEvent            │
├─────────────────────────────────────┤
│ PK  id              : Integer      │
│     name            : CharField(50)│
│     start_date      : DateTimeField│
│     end_date        : DateTimeField│
│     price_reduction : IntegerField │
└─────────────────────────────────────┘
```

**Description:**

- Defines promotional events and campaigns
- `name` provides unique identifier for the promotion
- `start_date` and `end_date` define promotion period
- `price_reduction` stores discount percentage (10%, 20%, 50%)
- Ordered by start date (newest first)

### 5. ProductPromotionEvent Entity

```
┌─────────────────────────────────────┐
│       ProductPromotionEvent         │
├─────────────────────────────────────┤
│ PK  id                  : Integer  │
│ FK  product_id          : Integer  │
│ FK  promotion_event_id  : Integer  │
└─────────────────────────────────────┘
```

**Description:**

- Junction table for many-to-many relationship between Product and PromotionEvent
- Allows products to participate in multiple promotions
- Allows promotions to include multiple products
- Unique constraint prevents duplicate product-promotion combinations

## Relationships

### 1. Category → Product (One-to-Many)

```
Category (1) ──────── (Many) Product
```

- One category can have multiple products
- Each product belongs to exactly one category
- Foreign key: `Product.category_id` → `Category.id`

### 2. Category → Category (Self-Referencing)

```
Category (1) ──────── (Many) Category
```

- Hierarchical category structure
- Parent categories can have multiple child categories
- Foreign key: `Category.parent_id` → `Category.id`

### 3. Product → StockManagement (One-to-One)

```
Product (1) ──────── (1) StockManagement
```

- Each product has exactly one stock record
- Each stock record belongs to exactly one product
- Foreign key: `StockManagement.product_id` → `Product.id`

### 4. Product ↔ PromotionEvent (Many-to-Many)

```
Product (Many) ──────── (Many) PromotionEvent
```

- Products can participate in multiple promotions
- Promotions can include multiple products
- Junction table: `ProductPromotionEvent`
- Foreign keys:
  - `ProductPromotionEvent.product_id` → `Product.id`
  - `ProductPromotionEvent.promotion_event_id` → `PromotionEvent.id`

## Database Constraints

### Primary Keys

- `Category.id` - Auto-incrementing integer
- `Product.id` - Auto-incrementing integer
- `StockManagement.id` - Auto-incrementing integer
- `PromotionEvent.id` - Auto-incrementing integer
- `ProductPromotionEvent.id` - Auto-incrementing integer

### Foreign Keys

- `Product.category_id` → `Category.id` (CASCADE delete)
- `Category.parent_id` → `Category.id` (RESTRICT delete)
- `StockManagement.product_id` → `Product.id` (CASCADE delete)
- `ProductPromotionEvent.product_id` → `Product.id` (CASCADE delete)
- `ProductPromotionEvent.promotion_event_id` → `PromotionEvent.id` (CASCADE delete)

### Unique Constraints

- `Category.name` - Unique category names
- `Category.slug` - Unique category slugs
- `Product.name` - Unique product names
- `Product.slug` - Unique product slugs
- `StockManagement.product_id` - One stock record per product
- `PromotionEvent.name` - Unique promotion event names
- `ProductPromotionEvent(product_id, promotion_event_id)` - Unique product-promotion combinations

## Indexes

- `Category.name` - For efficient category lookups
- `Category.slug` - For URL routing
- `Product.name` - For product searches
- `Product.slug` - For URL routing
- `Product.category_id` - For category-based product queries
- `Product.is_active` - For filtering active products
- `StockManagement.product_id` - For stock lookups
- `PromotionEvent.start_date` - For promotion date queries
- `PromotionEvent.end_date` - For active promotion filtering
- `ProductPromotionEvent.product_id` - For product promotion queries
- `ProductPromotionEvent.promotion_event_id` - For promotion product queries

## Business Rules

1. **Category Hierarchy**: Categories can have parent categories, creating a tree structure
2. **Product Categorization**: Every product must belong to a category
3. **Stock Tracking**: Every product has exactly one stock record
4. **Active Status**: Both categories and products have active/inactive status
5. **Digital Products**: Products can be marked as digital (no physical inventory)
6. **Price Precision**: Product prices stored with 2 decimal places
7. **Slug Uniqueness**: Both categories and products have unique URL-friendly slugs
8. **Promotion Management**: Products can participate in multiple promotional events
9. **Promotion Periods**: Promotions have defined start and end dates
10. **Discount Levels**: Promotions offer fixed discount percentages (10%, 20%, 50%)
11. **Unique Promotions**: Each product-promotion combination can only exist once
