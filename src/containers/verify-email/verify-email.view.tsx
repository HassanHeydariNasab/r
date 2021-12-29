import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface VerifyEmailViewProps {
  verificationCode: string;
  onChangeVerificationCode: ChangeEventHandler<HTMLInputElement>;
  onClickSubmit: MouseEventHandler;
  isLoading: boolean;
}

export const VerifyEmailView = ({
  verificationCode,
  onChangeVerificationCode,
  onClickSubmit,
  isLoading,
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
        autoFocus
      />
      <LoadingButton
        variant={"contained"}
        type={"submit"}
        onClick={onClickSubmit}
        loading={isLoading}
      >
        Verify Email
      </LoadingButton>
    </Stack>
  );
};
