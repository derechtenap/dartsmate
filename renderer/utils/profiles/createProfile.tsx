import fs from "fs";
import { randomUUID } from "crypto";

import { profileDir } from "./profileFolderHandling";

export const createProfile = async (profile: ProfileFile) => {
  try {
    // Append additional profile
    profile.avatarImage = profile.avatarImage[0];
    profile.createdAt = Date.now();
    profile.updatedAt = Date.now();
    profile.uuid = randomUUID();
    profile.stats = {
      games: 0,
      wins: 0,
      avg: 0,
      throws: 0,
      totalScore: 0,
      missedThrows: 0,
    };

    // Convert profile avatar to base64
    if (profile.avatarImage) {
      profile.avatarImage = (await getBase64(profile.avatarImage)) as string;
    }

    fs.writeFileSync(
      `${profileDir}/${profile.uuid}-${profile.createdAt}.save`,
      JSON.stringify(profile)
    );
  } catch (e) {
    console.error(e);
  }
};

const getBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
