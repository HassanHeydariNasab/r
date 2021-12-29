import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnterEmailScreen } from "./containers/enter-email";
import { SplashScreen } from "./containers/splash";

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path={"enter-email"} element={<EnterEmailScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
