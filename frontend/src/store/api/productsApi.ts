import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Product,
  ProductsResponse,
  ProductsQueryParams,
} from "../../models/product";
import type { Category } from "../../models/category";

// Create the API slice
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers) => {
      // Add any auth headers if needed
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    // Get all products with optional filtering
    getAllProducts: builder.query<Product[], void>({
      query: () => "products/",
      transformResponse: (response: any) => {
        console.log("Raw API Response:", response);

        // Handle both paginated and non-paginated responses
        if (response && typeof response === "object") {
          // If response has 'results' property, it's paginated
          if ("results" in response && Array.isArray(response.results)) {
            console.log("Paginated response detected, using results array");
            return response.results;
          }
          // If response is an array directly
          else if (Array.isArray(response)) {
            console.log("Direct array response detected");
            return response;
          }
          // If response has 'data' property
          else if ("data" in response && Array.isArray(response.data)) {
            console.log("Data property response detected");
            return response.data;
          }
        }

        console.log("No valid response structure found, returning empty array");
        return [];
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // Get a single product by ID
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}/`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Get products by category
    getProductsByCategory: builder.query<
      ProductsResponse,
      { category: string; params?: ProductsQueryParams }
    >({
      query: ({ category, params = {} }) => ({
        url: "products/",
        params: {
          category,
          page: params.page || 1,
          page_size: params.page_size || 12,
          ...(params.search && { search: params.search }),
          ...(params.min_price && { min_price: params.min_price }),
          ...(params.max_price && { max_price: params.max_price }),
          ...(params.ordering && { ordering: params.ordering }),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // Search products
    searchProducts: builder.query<
      ProductsResponse,
      { query: string; params?: ProductsQueryParams }
    >({
      query: ({ query, params = {} }) => ({
        url: "products/",
        params: {
          search: query,
          page: params.page || 1,
          page_size: params.page_size || 12,
          ...(params.category && { category: params.category }),
          ...(params.min_price && { min_price: params.min_price }),
          ...(params.max_price && { max_price: params.max_price }),
          ...(params.ordering && { ordering: params.ordering }),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} = productsApi;
