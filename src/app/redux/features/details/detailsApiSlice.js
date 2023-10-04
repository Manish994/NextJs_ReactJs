"use client";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../../api";

const baseEndPoint =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

export const detailsApiSlice = apiSlice.injectEndpoints({
  baseEndpoint: fetchBaseQuery({ baseUrl: baseEndPoint }),
  endpoints: (builder) => ({
    details: builder.mutation({
      query: (credentials) => ({
        url: "/UserManagement/GetUserDetailsGrid",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useDetailsMutation } = detailsApiSlice;
