import { readFileSync } from "fs";
import { profileDir, profileFileExtension } from "./profileFolderHandling";

// Loads the file content of a specific profile using the profile uuid
export const loadProfile = async (uuid: string) => {
  const profile = readFileSync(`${profileDir}/${uuid}${profileFileExtension}`, {
    encoding: "utf-8",
    flag: "r",
  });

  return await JSON.parse(profile);
};

// Loads all available profiles from the fs
export const loadAllProfiles = async () => {
  // TODO: Read the profile dir and get a list of all profiles
  // TODO: Map through the list and store the content in a array
  // TODO: Return data
};
