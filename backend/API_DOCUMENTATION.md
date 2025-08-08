# E-Commerce API Documentation

## Overview

This API provides comprehensive endpoints for managing an e-commerce platform. The API is built with Django REST Framework and documented using Swagger UI.

## Base URL

- **Development**: `http://localhost:8000/api/`
- **Production**: `https://api.ecommerce.com/api/`

## Authentication

- **Read Operations**: Publicly accessible
- **Write Operations**: Require authentication (JWT tokens recommended)

## API Documentation URLs

- **Swagger UI**: `http://localhost:8000/api/schema/swagger-ui/`
- **ReDoc**: `http://localhost:8000/api/schema/redoc/`
- **OpenAPI Schema**: `http://localhost:8000/api/schema/`

## Endpoints

### Products

#### List Products

```
GET /api/products/
```

**Query Parameters:**

- `name` (string): Filter by product name (case-insensitive contains)
- `category` (string): Filter by category name
- `min_price` (decimal): Filter by minimum price
- `max_price` (decimal): Filter by maximum price
- `is_active` (boolean): Filter by active status
- `search` (string): Search in name, description, and category name
- `ordering` (string): Order by field (name, price, created_at, updated_at)
- `page` (integer): Page number for pagination
- `page_size` (integer): Number of items per page

**Example:**

```bash
curl "http://localhost:8000/api/products/?search=headphones&min_price=50&ordering=price"
```

#### Get Product Details

```
GET /api/products/{id}/
```

#### Create Product

```
POST /api/products/
```

**Request Body:**

```json
{
  "name": "Wireless Headphones",
  "slug": "wireless-headphones",
  "description": "High-quality wireless headphones",
  "price": "99.99",
  "category_id": 1,
  "is_digital": false,
  "is_active": true
}
```

#### Update Product

```
PUT /api/products/{id}/
PATCH /api/products/{id}/
```

#### Delete Product

```
DELETE /api/products/{id}/
```

#### Get Product Stock

```
GET /api/products/{id}/stock/
```

#### Get Active Products

```
GET /api/products/active/
```

### Categories

#### List Categories

```
GET /api/categories/
```

#### Get Category Details

```
GET /api/categories/{id}/
```

#### Get Category Products

```
GET /api/categories/{id}/products/
```

### Stock Management

#### List Stock Records

```
GET /api/stock/
```

#### Get Low Stock Items

```
GET /api/stock/low_stock/
```

## Response Format

### Success Response

```json
{
  "count": 100,
  "next": "http://localhost:8000/api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "slug": "wireless-headphones",
      "description": "High-quality wireless headphones",
      "price": "99.99",
      "category": {
        "id": 1,
        "name": "Electronics",
        "slug": "electronics"
      },
      "is_digital": false,
      "is_active": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Error Response

```json
{
  "detail": "Error message",
  "code": "ERROR_CODE"
}
```

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 20, max: 100)

## Filtering

### Product Filters

- **Name**: `?name=headphones` (case-insensitive contains)
- **Category**: `?category=electronics` (category name)
- **Price Range**: `?min_price=50&max_price=200`
- **Status**: `?is_active=true`

### Search

- **Full-text search**: `?search=wireless headphones`
- Searches across product name, description, and category name

### Ordering

- **Single field**: `?ordering=name`
- **Reverse order**: `?ordering=-price`
- **Multiple fields**: `?ordering=category,name`

## Rate Limiting

- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour

## Error Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 400  | Bad Request - Invalid input data        |
| 401  | Unauthorized - Authentication required  |
| 403  | Forbidden - Insufficient permissions    |
| 404  | Not Found - Resource not found          |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error                   |

## Examples

### Get all electronics products under $100

```bash
curl "http://localhost:8000/api/products/?category=electronics&max_price=100"
```

### Search for wireless products

```bash
curl "http://localhost:8000/api/products/?search=wireless"
```

### Get products sorted by price (lowest first)

```bash
curl "http://localhost:8000/api/products/?ordering=price"
```

### Get products with pagination

```bash
curl "http://localhost:8000/api/products/?page=2&page_size=10"
```

## Development

### Running the Server

```bash
cd backend
python manage.py runserver
```

### Accessing Swagger UI

1. Start the server: `python manage.py runserver`
2. Open browser: `http://localhost:8000/api/schema/swagger-ui/`
3. Explore and test the API endpoints

### Generating Schema

```bash
python manage.py spectacular --file schema.yml
```

## Testing

### Using curl

```bash
# Get all products
curl http://localhost:8000/api/products/

# Create a product
curl -X POST http://localhost:8000/api/products/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":"29.99","category_id":1}'
```

### Using Swagger UI

1. Navigate to `http://localhost:8000/api/schema/swagger-ui/`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters and click "Execute"

## Support

For API support:

- Email: support@ecommerce.com
- Documentation: `http://localhost:8000/api/schema/redoc/`
- GitHub Issues: [Repository Issues]
