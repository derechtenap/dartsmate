import fs from "fs";
import os from "os";

const appDir = os.homedir() + "/dartmate"; // TODO: Does this works on macOS or linux?

export const checkIfProfileFolderExists = async () => {
  try {
    fs.opendirSync(`${appDir}/profiles`);
  } catch {
    console.warn("Profile directory doesn't exits. Creating a new directory!");
    createProfileFolder();
  }
};

export const createProfileFolder = () => {
  try {
    fs.mkdirSync(`${appDir}/profiles`);
    console.info("Created a new profile directory...");
  } catch (e) {
    console.error(e);
    throw new Error("UNABLE_TO_CREATE_PROFILE_DIR");
  }
};

export const profileDir = appDir + "/profiles";
export const profileFileExtension = ".profile";
