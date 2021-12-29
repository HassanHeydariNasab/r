import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashView } from "./splash.view";

export const SplashContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/enter-email");
  }, []);

  return <SplashView />;
};
