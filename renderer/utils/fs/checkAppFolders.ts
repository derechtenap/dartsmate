import { existsSync } from "fs";
import { createFolder } from "./createFolder";
import { APP_DIR, PROFILES_DIR, MATCHES_DIR } from "utils/constants";

export const checkAppFolders = () => {
  const folders = [APP_DIR, PROFILES_DIR, MATCHES_DIR];

  folders.forEach((folder) => {
    if (!existsSync(folder)) {
      createFolder(folder);
    }
  });
};
