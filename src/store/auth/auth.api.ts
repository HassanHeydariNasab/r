import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../api.types";
import type { User } from "./auth.types";

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
      { email: string }
    >({
      query: (body) => ({
        url: `/users/email`,
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation<
      ApiResponse,
      { email: string; token: string; verificationCode: string }
    >({
      query: (body) => ({
        url: `/users/email/verify`,
        method: "PUT",
        body,
      }),
    }),
    createUser: builder.mutation<
      ApiResponse<{ user: User }>,
      {
        token: string;
        firstName: string;
        email: string;
        referredCodeKey: string;
        agreeToPrivacyPolicy: boolean;
        source: string;
      }
    >({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<
      ApiResponse,
      {
        token: string;
        userId: string;
      }
    >({
      query: ({ token, userId }) => ({
        url: `/users/logout/${userId}`,
        headers: { authorization: `Bearer ${userId},${token}` },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRequestEmailVerificationMutation,
  useVerifyEmailMutation,
  useCreateUserMutation,
  useLogoutMutation,
} = authApi;
