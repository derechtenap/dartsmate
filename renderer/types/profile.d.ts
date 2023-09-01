import { MantineColor } from "@mantine/core";
import { UUID } from "crypto";

declare type Profile = {
  bio?: string;
  color: MantineColor;
  createdAt: number;
  name: string;
  updatedAt: number;
  uuid: UUID;
};
