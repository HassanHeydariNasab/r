import React from "react";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { Button, Stack, TextField } from "@mui/material";

interface EnterEmailViewProps {
  email: string;
  onChangeEmail: ChangeEventHandler<HTMLInputElement>;
  onClickSubmit: MouseEventHandler;
}

export const EnterEmailView = ({
  email,
  onChangeEmail,
  onClickSubmit,
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
      <Button variant={"contained"} type={"submit"} onClick={onClickSubmit}>
        Login / Sign Up
      </Button>
    </Stack>
  );
};
