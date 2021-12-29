import React, { useEffect } from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { authSliceActions } from "../../store/auth/auth.slice";
import { useRequestEmailVerificationMutation } from "../../store/auth/auth.api";
import { EnterEmailView } from "./enter-email.view";
import { useNavigate } from "react-router-dom";

export const EnterEmailContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [requestEmailVerification, { isLoading, data }] =
    useRequestEmailVerificationMutation({
      fixedCacheKey: "requestEmailVerification",
    });

  const email = useSelector((state: RootState) => state.auth.email);

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(authSliceActions.setEmail(event.target.value));
  };

  const onClickSubmit: MouseEventHandler = (event) => {
    event.preventDefault();
    requestEmailVerification({ email });
  };

  useEffect(() => {
    if (data && data.success) {
      // TODO check previous cached state
      navigate("/verify-email");
    }
  }, [data]);

  return <EnterEmailView {...{ email, onChangeEmail, onClickSubmit }} />;
};
