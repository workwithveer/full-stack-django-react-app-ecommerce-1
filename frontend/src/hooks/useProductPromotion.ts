import type { ProductPromotion } from "../models/promotion";
import {
  useGetProductPromotionEventsQuery,
  useGetPromotionEventsQuery,
} from "../store/api/promotionsApi";
import { useGetAllProductsQuery } from "../store/api/productsApi";
import { useEffect, useState } from "react";

export const useProductPromotions = () => {
  const [productPromotionsData, setProductPromotionsData] = useState<
    ProductPromotion[]
  >([]);
  const {
    data: productPromotions,
    isLoading: isLoadingProductPromotions,
    error: productPromotionsError,
  } = useGetProductPromotionEventsQuery();

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useGetAllProductsQuery();

  const {
    data: promotionEvents,
    isLoading: isLoadingPromotionEvents,
    error: promotionEventsError,
  } = useGetPromotionEventsQuery();

  // ... existing code ...
  useEffect(() => {
    if (productPromotions && products && promotionEvents) {
      const mappedData = productPromotions
        .map((productPromotion) => {
          const product = products.find(
            (product) => product.id === productPromotion.productId
          );
          const promotion = promotionEvents.find(
            (promotionEvent) =>
              promotionEvent.id === productPromotion.promotionEventId
          );

          if (!product || !promotion) return null;

          return {
            id: productPromotion.id,
            product,
            promotion,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      setProductPromotionsData(mappedData);
    }
  }, [productPromotions, products, promotionEvents]);

  console.log("productPromotionsData", productPromotionsData);

  return {
    productPromotionsData,
    isLoading:
      isLoadingProductPromotions ||
      isLoadingProducts ||
      isLoadingPromotionEvents,
    error: productPromotionsError || productsError || promotionEventsError,
    productPromotions,
    products,
    promotionEvents,
  };
};
