import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./auth.types";

interface AuthSlice {
  email: string;
  verificationCode: string;
  firstName: string;
  referredCodeKey: string;
  agreeToPrivacyPolicy: boolean;
  user: User | undefined;
}

export const initialState: AuthSlice = {
  email: "",
  verificationCode: "",
  firstName: "",
  referredCodeKey: "",
  agreeToPrivacyPolicy: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    setVerificationCode: (state, { payload }: PayloadAction<string>) => {
      state.verificationCode = payload;
    },
    setFirstName: (state, { payload }: PayloadAction<string>) => {
      state.firstName = payload;
    },
    setReferredCodeKey: (state, { payload }: PayloadAction<string>) => {
      state.referredCodeKey = payload;
    },
    setAgreeToPrivacyPolicy: (state, { payload }: PayloadAction<boolean>) => {
      state.agreeToPrivacyPolicy = payload;
    },
    setUser: (state, { payload }: PayloadAction<User | undefined>) => {
      state.user = payload;
    },
    resetAuthFlow: (state) => {
      state.email = "";
      state.verificationCode = "";
      state.referredCodeKey = "";
      state.agreeToPrivacyPolicy = false;
      state.firstName = "";
    },
  },
});

export const { reducer: authSliceReducer, actions: authSliceActions } =
  authSlice;
