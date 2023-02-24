import { readFileSync } from "fs";
import { profileDir } from "./profileFolderHandling";

export const loadProfile = async (filename: string) => {
  const profile = readFileSync(`${profileDir}/${filename}`, {
    encoding: "utf-8",
    flag: "r",
  });

  return await JSON.parse(profile);
};
