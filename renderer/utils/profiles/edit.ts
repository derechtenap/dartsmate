import fs from "fs";
import { loadProfile } from "./load";
import {
  profileDir as dir,
  profileFileExtension as fileExtension,
} from "./profileFolderHandling";

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
    `${dir}/${profile.uuid + fileExtension}`,
    JSON.stringify(profile),
    {
      encoding: "utf-8",
      flag: "w",
    }
  );
};
