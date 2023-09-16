import { readdirSync } from "fs";

export const readFolder = (path: string) => {
  return readdirSync(path);
};
