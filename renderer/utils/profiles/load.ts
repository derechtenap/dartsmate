import { readdirSync, readFileSync } from "fs";
import { PROFILE_SAVE_DIRECTORY } from "utils/constants";

// Loads the file content of a specific profile using the profile uuid
export const loadProfile = async (file: string) => {
  try {
    const profile = readFileSync(`${PROFILE_SAVE_DIRECTORY}/${file}`, {
      encoding: "utf-8",
      flag: "r",
    });

    return await JSON.parse(profile);
  } catch (err) {
    console.error(err);
  }
};

// Returns a array with each file in the profile directory
export const readProfileDir = async () => {
  return readdirSync(PROFILE_SAVE_DIRECTORY, {
    encoding: "utf-8",
  });
};
