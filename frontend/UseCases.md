# E-commerce Frontend Use Cases

## Overview

This document outlines the use cases for the frontend React application that interfaces with the Django REST API backend. The frontend will provide a complete e-commerce experience with product browsing, shopping cart functionality, order management, and promotional features.

## User Authentication & Profile Management

### UC-001: User Registration

- **Actor**: New customer
- **Goal**: Create a new user account
- **Preconditions**: User is not logged in
- **Main Flow**:
  1. User navigates to registration page
  2. User fills in required information (username, email, password)
  3. System validates input data
  4. System creates new user account
  5. User receives confirmation and is redirected to login
- **Postconditions**: New user account is created and user can log in

### UC-002: User Login

- **Actor**: Registered user
- **Goal**: Access personalized features
- **Preconditions**: User has a valid account
- **Main Flow**:
  1. User navigates to login page
  2. User enters credentials
  3. System validates credentials
  4. System creates user session
  5. User is redirected to dashboard/home
- **Postconditions**: User is logged in and can access personalized features

### UC-003: User Profile Management

- **Actor**: Logged-in user
- **Goal**: Update personal information
- **Preconditions**: User is logged in
- **Main Flow**:
  1. User navigates to profile page
  2. User views current profile information
  3. User edits desired fields
  4. System validates changes
  5. System updates user profile
- **Postconditions**: User profile is updated

## Product Catalog & Browsing

### UC-004: Browse Product Categories
asxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
- **Actor**: Customer
- **Goal**: Explore products by category
- **Preconditions**: None
- **Main Flow**:
  1. User navigates to categories page
  2. System displays hierarchical category structure
  3. User selects a category
  4. System displays products in selected category
- **Postconditions**: User can view products in selected category

### UC-005: Search Products

- **Actor**: Customer
- **Goal**: Find specific products
- **Preconditions**: None
- **Main Flow**:
  1. User enters search term in search bar
  2. System performs search across product names and descriptions
  3. System displays matching products
  4. User can filter and sort results
- **Postconditions**: User can view search results

### UC-006: View Product Details

- **Actor**: Customer
- **Goal**: Get detailed product information
- **Preconditions**: Product exists in catalog
- **Main Flow**:
  1. User selects a product from catalog
  2. System displays detailed product information
  3. System shows stock availability
  4. System displays applicable promotions
  5. User can add product to cart
- **Postconditions**: User has complete product information

### UC-007: Filter and Sort Products

- **Actor**: Customer
- **Goal**: Find products matching specific criteria
- **Preconditions**: User is viewing product list
- **Main Flow**:
  1. User applies filters (price range, category, availability)
  2. User selects sort option (price, name, date)
  3. System updates product list based on criteria
  4. User can combine multiple filters
- **Postconditions**: Product list is filtered and sorted

## Shopping Cart Management

### UC-008: Add Product to Cart

- **Actor**: Customer
- **Goal**: Add items to shopping cart
- **Preconditions**: Product is available and in stock
- **Main Flow**:
  1. User selects product quantity
  2. User clicks "Add to Cart" button
  3. System validates stock availability
  4. System adds product to cart
  5. System updates cart total
- **Postconditions**: Product is added to cart

### UC-009: View Shopping Cart

- **Actor**: Customer
- **Goal**: Review cart contents
- **Preconditions**: User has items in cart
- **Main Flow**:
  1. User navigates to cart page
  2. System displays all cart items
  3. System shows quantities and prices
  4. System calculates total with applicable discounts
- **Postconditions**: User can see complete cart information

### UC-010: Update Cart Quantities

- **Actor**: Customer
- **Goal**: Modify product quantities in cart
- **Preconditions**: User has items in cart
- **Main Flow**:
  1. User changes quantity for specific item
  2. System validates stock availability
  3. System updates item quantity
  4. System recalculates cart total
- **Postconditions**: Cart quantities are updated

### UC-011: Remove Product from Cart

- **Actor**: Customer
- **Goal**: Remove unwanted items from cart
- **Preconditions**: User has items in cart
- **Main Flow**:
  1. User clicks remove button for specific item
  2. System removes item from cart
  3. System recalculates cart total
- **Postconditions**: Item is removed from cart

## Promotions & Discounts

### UC-012: View Active Promotions

- **Actor**: Customer
- **Goal**: See available promotional offers
- **Preconditions**: None
- **Main Flow**:
  1. User navigates to promotions page
  2. System displays active promotion events
  3. System shows promotion details (discount percentage, dates)
  4. User can view products included in promotions
- **Postconditions**: User can see all active promotions

### UC-013: Apply Promotional Discounts

- **Actor**: Customer
- **Goal**: Get discounted prices on promotional items
- **Preconditions**: User is viewing products with active promotions
- **Main Flow**:
  1. System automatically applies promotional discounts
  2. System displays original and discounted prices
  3. System shows discount percentage
  4. User can see savings amount
- **Postconditions**: Promotional prices are applied

## Order Management

### UC-014: Create Order

- **Actor**: Customer
- **Goal**: Complete purchase transaction
- **Preconditions**: User has items in cart and is logged in
- **Main Flow**:
  1. User proceeds to checkout
  2. User reviews cart contents and totals
  3. User confirms order details
  4. System creates order record
  5. System updates product stock levels
  6. System clears user's cart
- **Postconditions**: Order is created and cart is cleared

### UC-015: View Order History

- **Actor**: Logged-in user
- **Goal**: Review past orders
- **Preconditions**: User has placed orders
- **Main Flow**:
  1. User navigates to order history page
  2. System displays list of user's orders
  3. User can view order details
  4. System shows order status and dates
- **Postconditions**: User can see complete order history

### UC-016: View Order Details

- **Actor**: Logged-in user
- **Goal**: Get detailed information about specific order
- **Preconditions**: Order exists for user
- **Main Flow**:
  1. User selects specific order from history
  2. System displays order details
  3. System shows all products in order
  4. System displays quantities and prices
  5. System shows order total and status
- **Postconditions**: User has complete order information

## Stock Management

### UC-017: Check Product Availability

- **Actor**: Customer
- **Goal**: Know if products are in stock
- **Preconditions**: Product exists in catalog
- **Main Flow**:
  1. System displays stock status for each product
  2. System shows available quantity
  3. System indicates if product is out of stock
  4. User can see last stock update time
- **Postconditions**: User knows product availability

### UC-018: Stock Notifications

- **Actor**: Customer
- **Goal**: Get notified about stock status
- **Preconditions**: User is interested in specific product
- **Main Flow**:
  1. User subscribes to stock notifications for out-of-stock product
  2. System records user's interest
  3. System notifies user when product becomes available
- **Postconditions**: User receives stock notifications

## Admin Features (if applicable)

### UC-019: Product Management (Admin)

- **Actor**: Admin user
- **Goal**: Manage product catalog
- **Preconditions**: User has admin privileges
- **Main Flow**:
  1. Admin navigates to product management
  2. Admin can add, edit, or remove products
  3. Admin can manage product categories
  4. Admin can update stock levels
- **Postconditions**: Product catalog is updated

### UC-020: Order Management (Admin)

- **Actor**: Admin user
- **Goal**: Manage customer orders
- **Preconditions**: User has admin privileges
- **Main Flow**:
  1. Admin navigates to order management
  2. Admin can view all orders
  3. Admin can update order status
  4. Admin can view order details
- **Postconditions**: Orders are properly managed

## Technical Requirements

### Performance Requirements

- Page load times should be under 3 seconds
- Search results should appear within 1 second
- Cart updates should be real-time

### Security Requirements

- User authentication required for sensitive operations
- Input validation on all forms
- CSRF protection for all POST requests
- Secure handling of user data

### Usability Requirements

- Responsive design for mobile and desktop
- Intuitive navigation
- Clear product images and descriptions
- Easy-to-use shopping cart interface
- Accessible design following WCAG guidelines

## API Integration Points

### Products API

- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `GET /api/categories/` - List categories
- `GET /api/stock-management/` - Get stock information

### Orders API

- `GET /api/orders/` - List user orders
- `POST /api/orders/` - Create new order
- `GET /api/orders/{id}/` - Get order details

### Promotions API

- `GET /api/promotion-events/` - List active promotions
- `GET /api/product-promotion-events/` - Get product promotions

## Error Handling

### Common Error Scenarios

- Network connectivity issues
- Invalid user input
- Out-of-stock products
- Expired promotions
- Authentication failures

### User Feedback

- Clear error messages
- Loading states for async operations
- Success confirmations
- Validation feedback on forms
