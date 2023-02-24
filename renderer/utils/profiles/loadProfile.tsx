import { readFileSync } from "fs";
import { profileDir } from "./profileFolderHandling";

export const loadProfile = async (filename: string) => {
  const profile = await readFileSync(`${profileDir}/${filename}`);

  return await JSON.parse(profile);
};
