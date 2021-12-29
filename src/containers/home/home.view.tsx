import React from "react";
import type { MouseEventHandler } from "react";
import { Avatar, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import type { User } from "../../store/auth/auth.types";

interface HomeViewProps {
  user: User | undefined;
  onClickLogout: MouseEventHandler;
  isLoadingLogout: boolean;
}

export const HomeView = ({
  user,
  onClickLogout,
  isLoadingLogout,
}: HomeViewProps) => {
  return (
    <Stack
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={4}
    >
      {user !== undefined && (
        <>
          <Avatar src={user.avatar} />
          <div>Hey {user.firstName}!</div>
          <LoadingButton
            variant={"contained"}
            onClick={onClickLogout}
            loading={isLoadingLogout}
          >
            Logout
          </LoadingButton>
        </>
      )}
    </Stack>
  );
};
