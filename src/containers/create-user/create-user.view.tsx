import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Button, Checkbox, Stack, TextField } from "@mui/material";

interface CreateUserViewProps {
  email: string;
  firstName: string;
  referredCodeKey: string;
  agreeToPrivacyPolicy: boolean;
  onChangeFirstName: ChangeEventHandler<HTMLInputElement>;
  onChangeReferredCodeKey: ChangeEventHandler<HTMLInputElement>;
  onChangeAgreeToPrivacyPolicy: ChangeEventHandler<HTMLInputElement>;
  onClickSubmit: MouseEventHandler;
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
      />
      <TextField
        label={"First Name"}
        type={"text"}
        value={firstName}
        onChange={onChangeFirstName}
      />
      <TextField
        label={"Referred Code"}
        type={"text"}
        value={referredCodeKey}
        onChange={onChangeReferredCodeKey}
      />
      <Checkbox
        title={"I'm agree to Privacy Policy"}
        checked={agreeToPrivacyPolicy}
        onChange={onChangeAgreeToPrivacyPolicy}
      />
      <Button variant={"contained"} type={"submit"} onClick={onClickSubmit}>
        Register
      </Button>
    </Stack>
  );
};
