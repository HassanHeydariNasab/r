import React from "react";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { RootRouter } from "./root-router";
import "./App.css";

export const theme = createTheme();

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <RootRouter />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
