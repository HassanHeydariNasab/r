import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./containers/splash";
import { EnterEmailScreen } from "./containers/enter-email";
import { VerifyEmailScreen } from "./containers/verify-email";
import { CreateUserScreen } from "./containers/create-user";
import { HomeScreen } from "./containers/home";

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path={"enter-email"} element={<EnterEmailScreen />} />
        <Route path={"verify-email"} element={<VerifyEmailScreen />} />
        <Route path={"create-user"} element={<CreateUserScreen />} />
        <Route path={"home"} element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
