import fs from "fs";
import { randomUUID } from "crypto";

import {
  profileDir as dir,
  profileFileExtension as fileExtension,
} from "./profileFolderHandling";

export const createProfile = async (profile: ProfileFile) => {
  try {
    // Append additional profile
    profile.created_at = Date.now();
    profile.updated_at = Date.now();
    profile.uuid = randomUUID();
    profile.stats = {
      games: 0,
      wins: 0,
      avg: 0,
      throws: 0,
      total_score: 0,
      missed_throws: 0,
    };

    // Write profle to file system
    fs.writeFileSync(
      `${dir}/${profile.uuid + fileExtension}`,
      JSON.stringify(profile)
    );
  } catch (e) {
    console.error(e);
  }
};
