import type { DefaultMantineColor } from "@mantine/core";

declare type Profile = {
  avatarImage?: string;
  bio: string;
  color: DefaultMantineColor;
  createdAt: number;
  isGuestProfile?: boolean;
  name: {
    firstName: string;
    lastName: string;
  };
  username: string;
  updatedAt: number;
  uuid: string;
  // badges?: {
  //  isDeveloper: boolean;
  //  isAlphaUser: boolean;
  //  isBetaUser: boolean;
  //  isProUser: boolean;
  // };
};
