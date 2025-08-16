import type { Category } from './category';
// Types for products
export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  price: string;
  category: Category;
  imageUrl?: string;
  stockQuantity?: number;
  rating?: number;
  reviewCount?: number;
  is_active: boolean;
  isDigital: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductsQueryParams {
  page?: number;
  page_size?: number;
  category?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  ordering?: string;
}
