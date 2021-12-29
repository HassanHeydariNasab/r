import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../api.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hiring.getbasis.co/candidate",
  }),
  endpoints: (builder) => ({
    requestEmailVerification: builder.mutation<
      ApiResponse<{
        wrongEmailTokenCount: number;
        resendEmailTokenCount: number;
        token: number;
        isLogin: boolean;
      }>,
      string
    >({
      query: (email) => ({
        url: `/users/email`,
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const { useRequestEmailVerificationMutation } = authApi;
