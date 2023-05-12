import { readdirSync, readFileSync } from "fs";
import path from "path";
import { PROFILE_SAVE_DIRECTORY } from "utils/constants";

// Loads the file content of a specific profile using the profile uuid
export const loadProfile = async (file: string) => {
  try {
    const profilePath = path.join(PROFILE_SAVE_DIRECTORY as string, file);

    const profile = readFileSync(profilePath, {
      encoding: "utf-8",
      flag: "r",
    });

    const profileJSON = (await JSON.parse(profile)) as ProfileFile;
    return profileJSON;
  } catch (err) {
    throw new Error(`Failed to load profile "${file}"!`);
  }
};

// Returns a array with each file in the profile directory
export const readProfileDir = () => {
  return readdirSync(PROFILE_SAVE_DIRECTORY as string, {
    encoding: "utf-8",
  });
};
