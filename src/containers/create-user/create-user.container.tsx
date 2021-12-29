import React, { useEffect } from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { authSliceActions } from "../../store/auth/auth.slice";
import {
  useCheckReferredCodeKeyQuery,
  useCreateUserMutation,
  useRequestEmailVerificationMutation,
} from "../../store/auth/auth.api";
import { CreateUserView } from "./create-user.view";
import { useNavigate } from "react-router-dom";

export const CreateUserContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, firstName, referredCodeKey, agreeToPrivacyPolicy } =
    useSelector((state: RootState) => state.auth, shallowEqual);

  const [createUser, { data, isLoading }] = useCreateUserMutation();

  const {
    data: checkReferredCodeKeyData,
    isError,
    isLoading: isCheckReferredCodeKeyLoading,
  } = useCheckReferredCodeKeyQuery({ referredCodeKey });

  const isReferredCodeKeyValid =
    !isError && !!checkReferredCodeKeyData && checkReferredCodeKeyData.success;

  const [, { data: requestEmailVerificationData }] =
    useRequestEmailVerificationMutation({
      fixedCacheKey: "requestEmailVerification",
    });

  const onChangeFirstName: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(authSliceActions.setFirstName(event.target.value));
  };

  const onChangeReferredCodeKey: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(authSliceActions.setReferredCodeKey(event.target.value));
  };

  const onChangeAgreeToPrivacyPolicy: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(authSliceActions.setAgreeToPrivacyPolicy(event.target.checked));
  };

  const isSubmitDisabled = !(
    firstName.length > 0 &&
    agreeToPrivacyPolicy &&
    (isReferredCodeKeyValid || referredCodeKey.length === 0)
  );

  const onClickSubmit: MouseEventHandler = (event) => {
    event.preventDefault();
    if (requestEmailVerificationData === undefined) return;
    createUser({
      email,
      token: requestEmailVerificationData.results.token.toString(),
      firstName,
      referredCodeKey,
      agreeToPrivacyPolicy,
      source: "WEB_APP",
    });
  };

  useEffect(() => {
    if (requestEmailVerificationData === undefined) return;
    if (data && data.success && data.results.user) {
      dispatch(authSliceActions.setUser(data.results.user));
      localStorage.setItem("user", JSON.stringify(data.results.user));
      navigate("/home");
    }
  }, [data]);

  return (
    <CreateUserView
      {...{
        email,
        firstName,
        referredCodeKey,
        agreeToPrivacyPolicy,
        onChangeFirstName,
        onChangeReferredCodeKey,
        onChangeAgreeToPrivacyPolicy,
        onClickSubmit,
        isSubmitDisabled,
        isReferredCodeKeyValid,
        isCheckReferredCodeKeyLoading,
      }}
    />
  );
};
