import fs from "fs";
import { PROFILE_SAVE_DIRECTORY } from "utils/constants";

export const loadProfileList = () => {
  try {
    return fs.readdirSync(PROFILE_SAVE_DIRECTORY);
  } catch (e) {
    console.error(e);
    return [];
  }
};
