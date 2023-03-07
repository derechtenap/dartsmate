import fs from "fs";
import { randomUUID } from "crypto";

import { profileDir, profileFileExtension } from "./profileFolderHandling";

export const createProfile = async (profile: ProfileFile) => {
  try {
    // Append additional profile
    profile.avatar_image = profile.avatar_image[0];
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

    // Convert profile avatar to base64
    if (profile.avatar_image) {
      profile.avatar_image = (await getBase64(profile.avatar_image)) as string;
    }

    fs.writeFileSync(
      `${profileDir}/${profile.uuid + profileFileExtension}`,
      JSON.stringify(profile)
    );
  } catch (e) {
    console.error(e);
  }
};

const getBase64 = async (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
