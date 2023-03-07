import fs from "fs";
import { profileDir } from "./profileFolderHandling";

export const loadProfileList = () => {
  try {
    return fs.readdirSync(profileDir);
  } catch (e) {
    console.error(e);
    return [];
  }
};
