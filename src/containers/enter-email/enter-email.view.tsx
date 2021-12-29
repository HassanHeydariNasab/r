import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface EnterEmailViewProps {
  email: string;
  onChangeEmail: ChangeEventHandler<HTMLInputElement>;
  onClickSubmit: MouseEventHandler;
  isLoading: boolean;
}

export const EnterEmailView = ({
  email,
  onChangeEmail,
  onClickSubmit,
  isLoading,
}: EnterEmailViewProps) => {
  return (
    <Stack
      component={"form"}
      direction={"column"}
      pt={12}
      px={"20%"}
      spacing={4}
    >
      <TextField
        label={"email"}
        type={"email"}
        value={email}
        onChange={onChangeEmail}
      />
      <LoadingButton
        variant={"contained"}
        type={"submit"}
        onClick={onClickSubmit}
        loading={isLoading}
      >
        Login / Sign Up
      </LoadingButton>
    </Stack>
  );
};
