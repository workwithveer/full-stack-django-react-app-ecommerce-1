import type { Product } from "./product";

// Promotion event interface
export interface PromotionEvent {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  priceReduction: string;
}

export interface ProductPromotionEvent {
  id: number;
  productId: number;
  promotionEventId: number;
}

export interface ProductPromotion {
  id: number;
  product: Product;
  promotion: PromotionEvent;
}
