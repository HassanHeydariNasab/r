import React, { useRef } from "react";
import type { MouseEventHandler } from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  OutlinedInput,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import type { User } from "../../store/auth/auth.types";

interface HomeViewProps {
  user: User | undefined;
  onClickReferralCode: MouseEventHandler;
  onClickLogout: MouseEventHandler;
  isLoadingLogout: boolean;
}

export const HomeView = ({
  user,
  onClickReferralCode,
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
          <Box>Hey {user.firstName}!</Box>
          <Box>
            email: {user.email}{" "}
            <Chip
              label={user.emailVerified ? "verified" : "unverified"}
              color={user.emailVerified ? "success" : "warning"}
            />
          </Box>
          <Box>
            phone number: {user.phoneNumber}{" "}
            <Chip
              label={user.phoneNumberVerified ? "verified" : "unverified"}
              color={user.phoneNumberVerified ? "success" : "warning"}
            />
          </Box>
          <Tooltip title={"click to copy"}>
            <TextField
              value={`${window.location.origin}/enter-email/${user.referralToken}`}
              onClick={onClickReferralCode}
            />
          </Tooltip>
          <LoadingButton
            variant={"contained"}
            onClick={onClickLogout}
            loading={isLoadingLogout}
            color={"error"}
          >
            Logout
          </LoadingButton>
        </>
      )}
    </Stack>
  );
};
