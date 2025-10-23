import type {
  Product,
  Category,
  PromotionEvent,
  ProductPromotionEvent,
} from "../models";

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    isActive: true,
    level: 0,
    parent: null,
  },
  {
    id: 2,
    name: "Smartphones",
    slug: "smartphones",
    isActive: true,
    level: 1,
    parent: 1,
  },
  {
    id: 3,
    name: "Laptops",
    slug: "laptops",
    isActive: true,
    level: 1,
    parent: 1,
  },
  {
    id: 4,
    name: "Clothing",
    slug: "clothing",
    isActive: true,
    level: 0,
    parent: null,
  },
  {
    id: 5,
    name: "Men's Clothing",
    slug: "mens-clothing",
    isActive: true,
    level: 1,
    parent: 4,
  },
  {
    id: 6,
    name: "Women's Clothing",
    slug: "womens-clothing",
    isActive: true,
    level: 1,
    parent: 4,
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced camera system and A17 Pro chip",
    slug: "iphone-15-pro",
    price: "999.00",
    category: mockCategories[1], // Smartphones
    imageUrl: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
    stockQuantity: 50,
    rating: 4.8,
    reviewCount: 1250,
    is_active: true,
    isDigital: false,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    description: "Powerful laptop with M3 chip for professional work",
    slug: "macbook-pro-m3",
    price: "1999.00",
    category: mockCategories[2], // Laptops
    imageUrl: "https://via.placeholder.com/300x300?text=MacBook+Pro+M3",
    stockQuantity: 25,
    rating: 4.9,
    reviewCount: 890,
    is_active: true,
    isDigital: false,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    description: "Premium Android smartphone with AI features",
    slug: "samsung-galaxy-s24",
    price: "799.00",
    category: mockCategories[1], // Smartphones
    imageUrl: "https://via.placeholder.com/300x300?text=Galaxy+S24",
    stockQuantity: 75,
    rating: 4.7,
    reviewCount: 2100,
    is_active: true,
    isDigital: false,
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
  },
  {
    id: 4,
    name: "Dell XPS 13",
    description: "Ultrabook with stunning display and long battery life",
    slug: "dell-xps-13",
    price: "1299.00",
    category: mockCategories[2], // Laptops
    imageUrl: "https://via.placeholder.com/300x300?text=Dell+XPS+13",
    stockQuantity: 40,
    rating: 4.6,
    reviewCount: 650,
    is_active: true,
    isDigital: false,
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
  },
  {
    id: 5,
    name: "Men's Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    slug: "mens-casual-t-shirt",
    price: "29.99",
    category: mockCategories[4], // Men's Clothing
    imageUrl: "https://via.placeholder.com/300x300?text=Mens+T-Shirt",
    stockQuantity: 200,
    rating: 4.3,
    reviewCount: 450,
    is_active: true,
    isDigital: false,
    created_at: "2024-01-12T10:00:00Z",
    updated_at: "2024-01-12T10:00:00Z",
  },
  {
    id: 6,
    name: "Women's Summer Dress",
    description: "Elegant summer dress perfect for any occasion",
    slug: "womens-summer-dress",
    price: "79.99",
    category: mockCategories[5], // Women's Clothing
    imageUrl: "https://via.placeholder.com/300x300?text=Womens+Dress",
    stockQuantity: 120,
    rating: 4.5,
    reviewCount: 320,
    is_active: true,
    isDigital: false,
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z",
  },
];

// Mock Promotion Events
export const mockPromotionEvents: PromotionEvent[] = [
  {
    id: 1,
    name: "Black Friday Sale",
    startDate: "2024-11-24T00:00:00Z",
    endDate: "2024-11-30T23:59:59Z",
    priceReduction: "30.00",
  },
  {
    id: 2,
    name: "Summer Clearance",
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    priceReduction: "25.00",
  },
  {
    id: 3,
    name: "New Year Special",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-01-31T23:59:59Z",
    priceReduction: "20.00",
  },
];

// Mock Product Promotion Events
export const mockProductPromotionEvents: ProductPromotionEvent[] = [
  {
    id: 1,
    productId: 1,
    promotionEventId: 1,
  },
  {
    id: 2,
    productId: 2,
    promotionEventId: 1,
  },
  {
    id: 3,
    productId: 5,
    promotionEventId: 2,
  },
  {
    id: 4,
    productId: 6,
    promotionEventId: 2,
  },
];
