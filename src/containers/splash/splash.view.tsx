import React from "react";
import { Grid, CircularProgress } from "@mui/material";

export const SplashView = () => {
  return (
    <Grid
      container
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress />
    </Grid>
  );
};
