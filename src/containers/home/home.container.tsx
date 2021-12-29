import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { authApi, useLogoutMutation } from "../../store/auth/auth.api";
import { authSliceActions } from "../../store/auth/auth.slice";
import { HomeView } from "./home.view";

export const HomeContainer = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation();

  const onClickReferralCode = () => {
    if (user?.referralToken) {
      navigator.clipboard.writeText(
        `${window.location.origin}/enter-email/${user.referralToken}`
      );
    }
  };

  const onClickLogout = () => {
    if (user === undefined) return;
    logout({ token: user.token, userId: user._id });
    localStorage.removeItem("user");
    dispatch(authSliceActions.setUser(undefined));
  };

  useEffect(() => {
    dispatch(authApi.util.resetApiState());
    dispatch(authSliceActions.resetAuthFlow());
  }, []);

  useEffect(() => {
    // TODO use redux-persist in the future :D
    if (user === undefined && localStorage.getItem("user") === null) {
      navigate("/enter-email");
    }
  }, [user]);

  return (
    <HomeView
      {...{ user, onClickReferralCode, onClickLogout, isLoadingLogout }}
    />
  );
};
