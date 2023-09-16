import { DefaultMantineColor } from "@mantine/core";
import { UUID } from "crypto";

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
