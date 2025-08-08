# Redux Toolkit Implementation

This directory contains the Redux Toolkit (RTK) implementation for the e-commerce application.

## Structure

```
store/
├── index.ts              # Main store configuration
├── hooks.ts              # Typed Redux hooks
├── api/
│   └── productsApi.ts    # RTK Query API slice for products
├── slices/
│   ├── cartSlice.ts      # Shopping cart state management
│   └── authSlice.ts      # Authentication state management
└── README.md             # This file
```

## Features

### RTK Query API Slice (`productsApi.ts`)

- **Product Management**: Fetch products with filtering, pagination, and search
- **Category Management**: Get product categories
- **Search Functionality**: Search products by name/description
- **Caching**: Automatic caching and cache invalidation
- **Optimistic Updates**: Real-time UI updates

#### Available Hooks:

- `useGetProductsQuery()` - Fetch all products with optional filters
- `useGetProductQuery(id)` - Fetch single product by ID
- `useGetCategoriesQuery()` - Fetch all categories
- `useGetProductsByCategoryQuery()` - Fetch products by category
- `useSearchProductsQuery()` - Search products

### Cart Slice (`cartSlice.ts`)

- **Add to Cart**: Add products with quantity management
- **Remove from Cart**: Remove items completely
- **Update Quantity**: Change item quantities
- **Cart Total**: Calculate total price
- **Cart State**: Track cart open/close state

#### Available Actions:

- `addToCart(product)` - Add product to cart
- `removeFromCart(productId)` - Remove product from cart
- `updateQuantity({id, quantity})` - Update product quantity
- `clearCart()` - Clear all items
- `toggleCart()` - Toggle cart visibility

#### Available Selectors:

- `selectCartItems` - Get all cart items
- `selectCartItemCount` - Get total item count
- `selectCartTotal` - Get total price
- `selectCartIsOpen` - Get cart visibility state

### Auth Slice (`authSlice.ts`)

- **User Management**: Store user information
- **Token Management**: Handle authentication tokens
- **Login/Logout**: Manage authentication state
- **Persistence**: Store tokens in localStorage

#### Available Actions:

- `setUser(user)` - Set current user
- `setToken(token)` - Set authentication token
- `logout()` - Clear user and token
- `setLoading(boolean)` - Set loading state

#### Available Selectors:

- `selectUser` - Get current user
- `selectToken` - Get authentication token
- `selectIsAuthenticated` - Check if user is authenticated
- `selectIsLoading` - Get loading state

## Usage Examples

### Using RTK Query in Components

```typescript
import { useGetProductsQuery } from "../store/api/productsApi";

const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    page: 1,
    page_size: 12,
    category: "electronics",
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return <ProductGrid products={products.results} />;
};
```

### Using Cart State in Components

```typescript
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart, selectCartItemCount } from "../store/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector(selectCartItemCount);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        // ... other properties
      })
    );
  };

  return (
    <Button onClick={handleAddToCart}>Add to Cart ({cartItemCount})</Button>
  );
};
```

### Using Auth State in Components

```typescript
import { useAppSelector } from "../store/hooks";
import { selectUser, selectIsAuthenticated } from "../store/slices/authSlice";

const UserProfile = () => {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return <ProfileContent user={user} />;
};
```

## API Configuration

The API base URL is configured in `productsApi.ts`:

```typescript
baseQuery: fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
}),
```

## Error Handling

RTK Query provides automatic error handling. Components can access error states:

```typescript
const { data, isLoading, error } = useGetProductsQuery();

if (error) {
  // Handle error (show error message, retry, etc.)
  console.error("Failed to fetch products:", error);
}
```

## Caching Strategy

RTK Query automatically caches API responses and provides:

- **Automatic Cache Invalidation**: When data changes
- **Cache Time**: Configurable cache duration
- **Optimistic Updates**: Immediate UI updates
- **Background Refetching**: Keep data fresh

## TypeScript Support

All Redux state and actions are fully typed with TypeScript:

- **Store Types**: `RootState` and `AppDispatch`
- **Hook Types**: `useAppDispatch` and `useAppSelector`
- **API Types**: Product, Category, and response interfaces
- **Slice Types**: Cart and Auth state interfaces
