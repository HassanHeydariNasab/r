import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authSliceActions } from "./store/auth/auth.slice";
import { SplashScreen } from "./containers/splash";
import { EnterEmailScreen } from "./containers/enter-email";
import { VerifyEmailScreen } from "./containers/verify-email";
import { CreateUserScreen } from "./containers/create-user";
import { HomeScreen } from "./containers/home";

export const RootRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO use redux-persist in the future :D
    // Restore user from storage
    let storedUser = localStorage.getItem("user");
    if (storedUser === null) {
    } else {
      dispatch(authSliceActions.setUser(JSON.parse(storedUser)));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path={"enter-email"} element={<EnterEmailScreen />} />
        <Route
          path={"enter-email/:referralToken"}
          element={<EnterEmailScreen />}
        />
        <Route path={"verify-email"} element={<VerifyEmailScreen />} />
        <Route path={"create-user"} element={<CreateUserScreen />} />
        <Route path={"home"} element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
