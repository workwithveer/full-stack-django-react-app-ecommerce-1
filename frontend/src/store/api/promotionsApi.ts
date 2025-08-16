import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PromotionEvent,
  ProductPromotionEvent,
} from "../../models/promotion";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getPromotionEvents: builder.query<PromotionEvent[], void>({
      query: () => "promotion-events/",
    }),
    getProductPromotionEvents: builder.query<ProductPromotionEvent[], void>({
      query: () => "product-promotion-events/",
    }),
  }),
});

export const {
  useGetPromotionEventsQuery,
  useGetProductPromotionEventsQuery,
} = promotionApi;