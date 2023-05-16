import fs from "fs";
import { PROFILE_SAVE_DIRECTORY, FILE_TYPE_EXTENSIONS } from "utils/constants";

export const editProfile = async (
  profile: ProfileFile,
  name: string,
  img: string
) => {
  // Update profile
  profile.updated_at = Date.now();
  profile.name = name;
  profile.avatar_image = img;

  // Write to fs
  fs.writeFileSync(
    `${PROFILE_SAVE_DIRECTORY}/${profile.uuid + FILE_TYPE_EXTENSIONS.PROFILE}`,
    JSON.stringify(profile),
    {
      encoding: "utf-8",
      flag: "w",
    }
  );
};
