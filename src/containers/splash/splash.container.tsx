import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../store/auth/auth.slice";
import { SplashView } from "./splash.view";

export const SplashContainer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    // TODO use redux-persist in the future :D
    let storedUser = localStorage.getItem("user");
    if (storedUser === null) {
      navigate("/enter-email");
    } else {
      dispatch(authSliceActions.setUser(JSON.parse(storedUser)));
      navigate("/home");
    }
  }, []);

  return <SplashView />;
};
