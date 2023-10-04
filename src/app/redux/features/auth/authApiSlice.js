"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseEndPoint =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseEndPoint }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/UserManagement/Login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
