import fs from "fs";
import path from "path";
import { APP_DIRECTORY } from "./constants";

export const checkIfProfileFolderExists = (folder = "profiles") => {
  try {
    fs.opendirSync(path.join(APP_DIRECTORY, folder));
  } catch {
    console.warn(
      `${folder.toLocaleUpperCase()} directory doesn't exits. Creating a new directory!`
    );
    createProfileFolder(folder);
  }
};

export const createProfileFolder = (folder = "profiles") => {
  try {
    fs.mkdirSync(path.join(APP_DIRECTORY, folder));
    console.info(`Created a new ${folder} directory...`);
  } catch (e) {
    console.error(e);
    throw new Error(`UNABLE_TO_CREATE_DIR_${folder.toUpperCase()}`);
  }
};
