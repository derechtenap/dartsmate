import { readdirSync, readFileSync } from "fs";
import { profileDir } from "./profileFolderHandling";

// Loads the file content of a specific profile using the profile uuid
export const loadProfile = async (file: string) => {
  const profile = readFileSync(`${profileDir}/${file}`, {
    encoding: "utf-8",
    flag: "r",
  });

  return await JSON.parse(profile);
};

// Returns a array with each file in the profile directory
export const readProfileDir = async () => {
  return readdirSync(profileDir, {
    encoding: "utf-8",
  });
};
