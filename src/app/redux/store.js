"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApiSlice } from "./features/auth/authApiSlice";

import customizationReducer from "./customizationReducer";

import detailsReducer from "./features/details/detailsSlice";
import { detailsApiSlice } from "./features/details/detailsApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    customization: customizationReducer,
    details: detailsReducer,
    [detailsApiSlice.reducerPath]: detailsApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
  devTools: process.env.NODE_ENV == "development",
});
