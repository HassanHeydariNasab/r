import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Checkbox, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface CreateUserViewProps {
  email: string;
  firstName: string;
  referredCodeKey: string;
  agreeToPrivacyPolicy: boolean;
  onChangeFirstName: ChangeEventHandler<HTMLInputElement>;
  onChangeReferredCodeKey: ChangeEventHandler<HTMLInputElement>;
  onChangeAgreeToPrivacyPolicy: ChangeEventHandler<HTMLInputElement>;
  onClickSubmit: MouseEventHandler;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  isReferredCodeKeyValid: boolean;
  isCheckReferredCodeKeyLoading: boolean;
}

export const CreateUserView = ({
  email,
  firstName,
  referredCodeKey,
  agreeToPrivacyPolicy,
  onChangeFirstName,
  onChangeReferredCodeKey,
  onChangeAgreeToPrivacyPolicy,
  onClickSubmit,
  isLoading,
  isSubmitDisabled,
  isReferredCodeKeyValid,
  isCheckReferredCodeKeyLoading,
}: CreateUserViewProps) => {
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
        contentEditable={false}
        value={email}
        disabled
      />
      <TextField
        label={"First Name"}
        type={"text"}
        value={firstName}
        onChange={onChangeFirstName}
        helperText={"3 letters or more"}
        autoFocus
      />
      <TextField
        label={"Referred Code"}
        type={"text"}
        value={referredCodeKey}
        onChange={onChangeReferredCodeKey}
        error={
          referredCodeKey.length > 0 &&
          !isCheckReferredCodeKeyLoading &&
          !isReferredCodeKeyValid
        }
        helperText={
          isCheckReferredCodeKeyLoading
            ? "Validating..."
            : referredCodeKey.length > 0
            ? isReferredCodeKeyValid
              ? "OK!"
              : "Referred Code is invalid; leave it blank if you don't have any."
            : "Optional"
        }
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Checkbox
          checked={agreeToPrivacyPolicy}
          onChange={onChangeAgreeToPrivacyPolicy}
        />
        <span>{"I Agree To Privacy Policy"}</span>
      </Stack>
      <LoadingButton
        variant={"contained"}
        type={"submit"}
        onClick={onClickSubmit}
        disabled={isSubmitDisabled}
        loading={isLoading}
      >
        Register
      </LoadingButton>
    </Stack>
  );
};
