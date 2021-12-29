import React, { useEffect } from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { authSliceActions } from "../../store/auth/auth.slice";
import {
  useRequestEmailVerificationMutation,
  useVerifyEmailMutation,
} from "../../store/auth/auth.api";
import { VerifyEmailView } from "./verify-email.view";
import { useNavigate } from "react-router-dom";
import type { User } from "../../store/auth/auth.types";

export const VerifyEmailContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyEmail, { isLoading, data }] = useVerifyEmailMutation({
    fixedCacheKey: "verifyEmail",
  });

  const [, { data: requestEmailVerificationData }] =
    useRequestEmailVerificationMutation({
      fixedCacheKey: "requestEmailVerification",
    });

  const { email, verificationCode } = useSelector(
    (state: RootState) => state.auth
  );

  const onChangeVerificationCode: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(authSliceActions.setVerificationCode(event.target.value));
  };

  const onClickSubmit: MouseEventHandler = (event) => {
    event.preventDefault();
    if (requestEmailVerificationData === undefined) return;
    verifyEmail({
      email,
      verificationCode,
      token: requestEmailVerificationData.results.token.toString(),
    });
  };

  useEffect(() => {
    if (requestEmailVerificationData === undefined) return;
    if (data && data.success) {
      if (requestEmailVerificationData.results.isLogin) {
        dispatch(authSliceActions.setUser(data.results.user as User));
        localStorage.setItem("user", JSON.stringify(data.results.user));
        navigate("/home");
      } else {
        navigate("/create-user");
      }
    }
  }, [data]);

  return (
    <VerifyEmailView
      {...{
        verificationCode,
        onChangeVerificationCode,
        onClickSubmit,
        isLoading,
      }}
    />
  );
};
