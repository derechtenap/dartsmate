import type { DefaultMantineColor } from "@mantine/core";
import type { UUID } from "crypto";

declare type Profile = {
  bio: string;
  color: DefaultMantineColor;
  createdAt: number;
  username: string;
  updatedAt: number;
  uuid: UUID;
  // badges?: {
  //  isDeveloper: boolean;
  //  isAlphaUser: boolean;
  //  isBetaUser: boolean;
  //  isProUser: boolean;
  // };
};
