import { unlink } from "fs";
import { FILE_TYPE_EXTENSIONS, PROFILE_SAVE_DIRECTORY } from "utils/constants";

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
  unlink(
    `${PROFILE_SAVE_DIRECTORY}/${uuid + FILE_TYPE_EXTENSIONS.PROFILE}`,
    (err) => {
      if (err) {
        throw new Error(
          `Couldn't delete the profile with uuid ${uuid}: ${err}`
        );
      }
    }
  );
};
