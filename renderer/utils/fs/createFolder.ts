import { mkdirSync } from "fs";

export const createFolder = (path: string) => {
  mkdirSync(path);
};
