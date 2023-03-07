import { unlink } from "fs";

import {
  profileDir as dir,
  profileFileExtension as fileExtension,
} from "./profileFolderHandling";

/**
 *
 * Deletes the profile with the specified UUID from the filesystem.
 *
 * @async
 * @function
 *
 * @param {string} uuid - The UUID of the profile to delete.
 * @returns {Promise<void>} A Promise that resolves once the profile has been deleted.
 *          If an error occurs, the Promise is rejected with the error message.
 * @throws {Error} If an error occurs during the deletion process, an Error object with a message will be thrown.
 *
 */
export const deleteProfile = async (uuid: string): Promise<void> => {
  unlink(`${dir}/${uuid + fileExtension}`, (err) => {
    if (err) {
      throw new Error(`Couldn't delete the profile with uuid ${uuid}: ${err}`);
    }
  });
};
