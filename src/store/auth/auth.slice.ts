import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
  },
});

export const { reducer: authSliceReducer, actions: authSliceActions } =
  authSlice;
