import React, { useEffect } from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { authSliceActions } from "../../store/auth/auth.slice";
import {
  useRequestEmailVerificationMutation,
  useReRequestEmailVerificationMutation,
  useVerifyEmailMutation,
} from "../../store/auth/auth.api";
import { VerifyEmailView } from "./verify-email.view";
import { useNavigate } from "react-router-dom";
import type { User } from "../../store/auth/auth.types";

export const VerifyEmailContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, verificationCode } = useSelector(
    (state: RootState) => state.auth
  );

  const isSubmitDisabled = verificationCode.length !== 6;

  const [verifyEmail, { isLoading, data }] = useVerifyEmailMutation({
    fixedCacheKey: "verifyEmail",
  });

  const [, { data: requestEmailVerificationData }] =
    useRequestEmailVerificationMutation({
      fixedCacheKey: "requestEmailVerification",
    });

  const [
    reRequestEmailVerification,
    {
      data: reRequestEmailVerificationData,
      isLoading: isReRequestEmailVerificationLoading,
    },
  ] = useReRequestEmailVerificationMutation();

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

  const onClickResend: MouseEventHandler = (event) => {
    event.preventDefault();
    if (requestEmailVerificationData === undefined) return;
    reRequestEmailVerification({
      email,
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
    } else if (
      data &&
      data.messageObj &&
      data.messageObj.wrongEmailTokenCount > 2
    ) {
      // `navigate` will cause infinite loop
      // because of cached requestEmailVerification
      window.location.pathname = "/enter-email";
    }
  }, [data]);

  return (
    <VerifyEmailView
      {...{
        verificationCode,
        onChangeVerificationCode,
        isSubmitDisabled,
        onClickSubmit,
        isLoading,
        onClickResend,
        isReRequestEmailVerificationLoading,
        wrongEmailTokenCount:
          !!data && !!data.messageObj
            ? data.messageObj.wrongEmailTokenCount
            : 0,
        resendEmailTokenCount: !!reRequestEmailVerificationData
          ? reRequestEmailVerificationData.results.resendEmailTokenCount
          : 0,
      }}
    />
  );
};
