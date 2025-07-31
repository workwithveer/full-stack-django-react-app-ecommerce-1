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

    %% Relationships
    Category ||--o{ Product : "has many"
    Category ||--o{ Category : "self-referencing"
    Product ||--|| StockManagement : "has one"
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

### 4. **URL-Friendly Identifiers**

- Both categories and products have unique slugs
- Enables clean URL routing (e.g., `/category/electronics/`)

### 5. **Data Integrity**

- Foreign key constraints with appropriate cascade/restrict rules
- Unique constraints on names and slugs
- Timestamps for audit trails

## Database Relationships Summary

| Relationship              | Type             | Description                             |
| ------------------------- | ---------------- | --------------------------------------- |
| Category → Product        | One-to-Many      | One category can have multiple products |
| Category → Category       | Self-Referencing | Hierarchical category structure         |
| Product → StockManagement | One-to-One       | Each product has one stock record       |

## Constraints and Indexes

### Primary Keys

- All entities use auto-incrementing integer IDs

### Foreign Keys

- `Product.category_id` → `Category.id` (CASCADE)
- `Category.parent_id` → `Category.id` (RESTRICT)
- `StockManagement.product_id` → `Product.id` (CASCADE)

### Unique Constraints

- Category names and slugs
- Product names and slugs
- One stock record per product

### Recommended Indexes

- Category: `name`, `slug`, `parent_id`
- Product: `name`, `slug`, `category_id`, `is_active`
- StockManagement: `product_id`
