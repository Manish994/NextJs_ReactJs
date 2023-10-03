"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, updateSetCredentials } from "./features/auth/authSlice";
import TokenService from "@/utils/Token.service";

const apiLink =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

const requestLocks = {};

const baseQuery = fetchBaseQuery({
  baseUrl: apiLink,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState()?.auth?.accessToken;
    const tokenExpired = TokenService.isAccessExpired();
    if (accessToken && !tokenExpired) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const { url } = args;

  // Check if there's an ongoing request for the same URL.
  if (requestLocks[url]) {
    // Wait for the ongoing request to complete before proceeding.
    return requestLocks[url];
  }

  // Create a promise to track the request.
  const requestPromise = (async () => {
    try {
      let result = await baseQuery(args, api, extraOptions);
      if (result?.error?.status === 401) {
        const refreshResult = await refreshAccessToken(api, extraOptions);
        if (refreshResult?.data?.tokenString) {
          api.dispatch(
            updateSetCredentials({ response: refreshResult.data.tokenString })
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut);
        }
      }
      return result;
    } finally {
      // Release the lock when the request is completed.
      delete requestLocks[url];
    }
  })();

  // Store the promise to prevent concurrent requests with the same URL.
  requestLocks[url] = requestPromise;

  // Use Promise.all to await multiple requests, including potential duplicates.
  return Promise.all([requestPromise]);
};

const refreshAccessToken = async (api, extraOptions) => {
  const modifiedArgs = {
    method: "POST",
    url: "/UserManagement/GenerateToken",
    body: { UserToken: api.getState().auth.token },
  };

  return await baseQuery(modifiedArgs, api, extraOptions);
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
