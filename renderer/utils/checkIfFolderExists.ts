import fs from "fs";
import os from "os";

export const appDir = os.homedir() + "/dartmate"; // TODO: Does this works on macOS or linux?

export const checkIfProfileFolderExists = async (
  folder: string = "profiles"
) => {
  try {
    fs.opendirSync(`${appDir}/${folder}`);
  } catch {
    console.warn(
      `${folder.toLocaleUpperCase()} directory doesn't exits. Creating a new directory!`
    );
    createProfileFolder(folder);
  }
};

export const createProfileFolder = (folder: string = "profiles") => {
  try {
    fs.mkdirSync(`${appDir}/${folder}`);
    console.info(`Created a new ${folder} directory...`);
  } catch (e) {
    console.error(e);
    throw new Error(`UNABLE_TO_CREATE_DIR_${folder.toUpperCase()}`);
  }
};

export const profileDir = appDir + "/profiles";
export const gameDir = appDir + "/games";

export const profileFileExtension = ".profile";
export const gameFileExtension = ".game";
