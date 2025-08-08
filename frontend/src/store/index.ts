import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi";
import { categoriesApi } from "./api/categoriesApi";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    // API slices
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,

    // Local state slices
    cart: cartReducer,
    auth: authReducer,
  },

  // Add RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      categoriesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
