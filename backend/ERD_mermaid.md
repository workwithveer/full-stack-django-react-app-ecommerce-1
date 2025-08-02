# E-commerce Entity Relationship Diagram

## Visual ERD using Mermaid

```mermaid
erDiagram
    Category {
        int id PK
        int parent_id FK
        varchar name UK
        varchar slug UK
        boolean is_active
        smallint level
    }

    Product {
        int id PK
        int category_id FK
        varchar name UK
        varchar slug UK
        text description
        boolean is_digital
        boolean is_active
        datetime created_at
        datetime updated_at
        decimal price
    }

    StockManagement {
        int id PK
        int product_id FK UK
        int quantity
        datetime last_checked_at
    }

    PromotionEvent {
        int id PK
        varchar name UK
        datetime start_date
        datetime end_date
        int price_reduction
    }

    ProductPromotionEvent {
        int id PK
        int product_id FK
        int promotion_event_id FK
    }

    %% Relationships
    Category ||--o{ Product : "has many"
    Category ||--o{ Category : "self-referencing"
    Product ||--|| StockManagement : "has one"
    Product ||--o{ ProductPromotionEvent : "has many"
    PromotionEvent ||--o{ ProductPromotionEvent : "has many"
```

## Key Features of the Database Design

### 1. **Hierarchical Categories**

- Categories can have parent categories, creating a tree structure
- `level` field tracks depth in the hierarchy
- Self-referencing foreign key relationship

### 2. **Product Management**

- Each product belongs to exactly one category
- Support for both physical and digital products (`is_digital` flag)
- Price stored with decimal precision
- Active/inactive status control

### 3. **Inventory Tracking**

- One-to-one relationship between Product and StockManagement
- Tracks current quantity and last update timestamp
- Separate from product definition for flexibility

### 4. **Promotion System**

- **PromotionEvent**: Defines promotional campaigns with time periods
- **ProductPromotionEvent**: Junction table for many-to-many relationship
- Fixed discount levels (10%, 20%, 50%)
- Products can participate in multiple promotions
- Promotions can include multiple products

### 5. **URL-Friendly Identifiers**

- Both categories and products have unique slugs
- Enables clean URL routing (e.g., `/category/electronics/`)

### 6. **Data Integrity**

- Foreign key constraints with appropriate cascade/restrict rules
- Unique constraints on names and slugs
- Timestamps for audit trails
- Unique constraint on product-promotion combinations

## Database Relationships Summary

| Relationship                    | Type             | Description                                     |
| ------------------------------- | ---------------- | ----------------------------------------------- |
| Category → Product              | One-to-Many      | One category can have multiple products         |
| Category → Category             | Self-Referencing | Hierarchical category structure                 |
| Product → StockManagement       | One-to-One       | Each product has one stock record               |
| Product ↔ PromotionEvent        | Many-to-Many     | Products can participate in multiple promotions |
| Product → ProductPromotionEvent | One-to-Many      | Products can have multiple promotion records    |
| PromotionEvent → ProductPromotionEvent | One-to-Many | Promotions can include multiple products        |

## Constraints and Indexes

### Primary Keys

- All entities use auto-incrementing integer IDs

### Foreign Keys

- `Product.category_id` → `Category.id` (CASCADE)
- `Category.parent_id` → `Category.id` (RESTRICT)
- `StockManagement.product_id` → `Product.id` (CASCADE)
- `ProductPromotionEvent.product_id` → `Product.id` (CASCADE)
- `ProductPromotionEvent.promotion_event_id` → `PromotionEvent.id` (CASCADE)

### Unique Constraints

- Category names and slugs
- Product names and slugs
- One stock record per product
- Promotion event names
- Unique product-promotion combinations

### Recommended Indexes

- Category: `name`, `slug`, `parent_id`
- Product: `name`, `slug`, `category_id`, `is_active`
- StockManagement: `product_id`
- PromotionEvent: `start_date`, `end_date`, `name`
- ProductPromotionEvent: `product_id`, `promotion_event_id`

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
