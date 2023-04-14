import fs from "fs";
import { randomUUID } from "crypto";
import { FILE_TYPE_EXTENSIONS, PROFILE_SAVE_DIRECTORY } from "utils/constants";

/**
 * Creates a new profile file with the given profile object.
 * @async
 * @function createProfile
 * @param {ProfileFile} profile - The profile object to be created.
 * @returns {Promise<string>} The UUID of the newly created profile file.
 * @throws {Error} Will throw an error if there is an issue creating or writing the profile to the file system.
 */
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

    // Write profile to file system
    fs.writeFileSync(
      `${PROFILE_SAVE_DIRECTORY}/${
        profile.uuid + FILE_TYPE_EXTENSIONS.PROFILE
      }`,
      JSON.stringify(profile)
    );
  } catch (e) {
    console.error(e);
  }
};
