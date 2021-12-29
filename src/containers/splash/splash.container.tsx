import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashView } from "./splash.view";

export const SplashContainer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO use redux-persist in the future :D
    let storedUser = localStorage.getItem("user");
    if (storedUser === null) {
      navigate("/enter-email");
    } else {
      navigate("/home");
    }
  }, []);

  return <SplashView />;
};
