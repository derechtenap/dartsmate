import fs from "fs";
import { PROFILE_SAVE_DIRECTORY } from "utils/constants";

export const checkIfProfileFolderExists = async () => {
  try {
    fs.opendirSync(PROFILE_SAVE_DIRECTORY);
  } catch {
    console.warn("Profile directory doesn't exits. Creating a new directory!");
    createProfileFolder();
  }
};

export const createProfileFolder = () => {
  try {
    fs.mkdirSync(PROFILE_SAVE_DIRECTORY);
    console.info("Created a new profile directory...");
  } catch (e) {
    console.error(e);
    throw new Error("UNABLE_TO_CREATE_PROFILE_DIR");
  }
};
