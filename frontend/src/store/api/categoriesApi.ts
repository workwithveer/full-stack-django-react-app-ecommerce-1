// generate a file that fetches all the categories from the backend

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "../../models/category";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => "categories/",
      transformResponse: (response: any) => {
        console.log("Raw Categories API Response:", response);

        // Handle both paginated and non-paginated responses
        if (response && typeof response === "object") {
          // If response has 'results' property, it's paginated
          if ("results" in response && Array.isArray(response.results)) {
            console.log(
              "Paginated categories response detected, using results array"
            );
            return response.results;
          }
          // If response is an array directly
          else if (Array.isArray(response)) {
            console.log("Direct categories array response detected");
            return response;
          }
          // If response has 'data' property
          else if ("data" in response && Array.isArray(response.data)) {
            console.log("Categories data property response detected");
            return response.data;
          }
        }

        console.log(
          "No valid categories response structure found, returning empty array"
        );
        return [];
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Category" as const, id }))]
          : [],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
