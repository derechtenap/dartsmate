import { unlink } from "fs";
import { profileDir, profileFileExtension } from "./profileFolderHandling";

export const deleteProfile = async (uuid: string) => {
  unlink(`${profileDir}/${uuid + profileFileExtension}`, (err) => {
    if (err) console.error(err);
  });
};
