import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Button, Stack, TextField } from "@mui/material";

interface VerifyEmailViewProps {
  verificationCode: string;
  onChangeVerificationCode: ChangeEventHandler<HTMLInputElement>;
  onClickSubmit: MouseEventHandler;
}

export const VerifyEmailView = ({
  verificationCode,
  onChangeVerificationCode,
  onClickSubmit,
}: VerifyEmailViewProps) => {
  return (
    <Stack
      component={"form"}
      direction={"column"}
      pt={12}
      px={"20%"}
      spacing={4}
    >
      <TextField
        label={"verification code"}
        type={"text"}
        value={verificationCode}
        onChange={onChangeVerificationCode}
      />
      <Button variant={"contained"} type={"submit"} onClick={onClickSubmit}>
        Login / Sign Up
      </Button>
    </Stack>
  );
};
