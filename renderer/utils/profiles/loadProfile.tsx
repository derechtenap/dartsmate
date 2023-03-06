import { readdirSync, readFileSync } from "fs";
import { profileDir } from "./profileFolderHandling";

// Loads a single profile from the file system
export const loadProfile = async (filename: string) => {
  const profile = readFileSync(`${profileDir}/${filename}`, {
    encoding: "utf-8",
    flag: "r",
  });

  return await JSON.parse(profile);
};

// Loading all profiles from the file system and return them as array
export const loadAllProfiles = async () => {
  // Get all profiles from the folder
  let profilesList: string[] = [];
  let profiles = [];

  try {
    profilesList = readdirSync(profileDir);
  } catch (e) {
    console.error(e);
  } finally {
    profilesList.map(async (p) => {
      await loadProfile(p).then((res) => {
        // console.info(r);
        profiles.push(res);
      });

      return profiles;
    });
  }
};
