import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Button, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface VerifyEmailViewProps {
  verificationCode: string;
  onChangeVerificationCode: ChangeEventHandler<HTMLInputElement>;
  onClickSubmit: MouseEventHandler;
  isLoading: boolean;
  onClickResend: MouseEventHandler;
  isReRequestEmailVerificationLoading: boolean;
  wrongEmailTokenCount: number;
  resendEmailTokenCount: number;
}

export const VerifyEmailView = ({
  verificationCode,
  onChangeVerificationCode,
  onClickSubmit,
  isLoading,
  onClickResend,
  isReRequestEmailVerificationLoading,
  wrongEmailTokenCount,
  resendEmailTokenCount,
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
      <Stack direction={"row"}>
        <LoadingButton
          variant={"text"}
          onClick={onClickResend}
          loading={isReRequestEmailVerificationLoading}
          disabled={resendEmailTokenCount === 3}
        >
          Resend Email ({3 - resendEmailTokenCount} attempt
          {3 - resendEmailTokenCount !== 1 ? "s" : ""} is left)
        </LoadingButton>
        <LoadingButton
          variant={"contained"}
          type={"submit"}
          onClick={onClickSubmit}
          loading={isLoading}
          disabled={wrongEmailTokenCount === 3}
        >
          Verify Email {3 - wrongEmailTokenCount} attempt
          {3 - wrongEmailTokenCount !== 1 ? "s" : ""} is left
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
