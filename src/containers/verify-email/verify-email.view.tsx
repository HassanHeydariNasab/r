import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface VerifyEmailViewProps {
  verificationCode: string;
  onChangeVerificationCode: ChangeEventHandler<HTMLInputElement>;
  isSubmitDisabled: boolean;
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
  isSubmitDisabled,
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
        <Stack flex={1} alignItems={"center"}>
          <LoadingButton
            variant={"text"}
            onClick={onClickResend}
            loading={isReRequestEmailVerificationLoading}
            disabled={resendEmailTokenCount === 3}
            fullWidth
          >
            Resend Email
          </LoadingButton>
          <Box color={"text.secondary"} mt={1}>
            {3 - resendEmailTokenCount} resend
            {3 - resendEmailTokenCount !== 1 ? "s" : ""} is left
          </Box>
        </Stack>
        <Stack flex={2} alignItems={"center"}>
          <LoadingButton
            variant={"contained"}
            type={"submit"}
            onClick={onClickSubmit}
            loading={isLoading}
            disabled={wrongEmailTokenCount === 3 || isSubmitDisabled}
            fullWidth
          >
            Verify Email
          </LoadingButton>
          <Box color={"text.secondary"} mt={1}>
            {3 - wrongEmailTokenCount} attempt
            {3 - wrongEmailTokenCount !== 1 ? "s" : ""} is left
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
