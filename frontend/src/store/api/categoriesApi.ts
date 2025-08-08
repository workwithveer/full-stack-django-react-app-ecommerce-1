// generate a file that fetches all the categories from the backend

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "../../models/category";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => "categories/",
      transformResponse: (response: { data: Category[] }) => {
        console.log("API Response:", response);
        return response.data || [];
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: (result: Category[], error: any, id: number) =>
        result
          ? [...result.map(({ id }) => ({ type: "Category" as const, id }))]
          : [],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
