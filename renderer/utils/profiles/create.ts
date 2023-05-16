import fs from "fs";
import { randomUUID } from "crypto";
import { FILE_TYPE_EXTENSIONS, PROFILE_SAVE_DIRECTORY } from "utils/constants";

/**
 * Creates a new profile file with the given profile object.
 * @async
 * @function createProfile
 * @param {string} name - The name of the user.
 * @param {string | undefined} avatarImage - The base64 data for the avatar image. Can be undefined.
 * @returns {Promise<void>}
 * @throws {Error} Will throw an error if there is an issue creating or writing the profile to the file system.
 */
export const createProfile = async (
  name: string,
  avatarImage: string | undefined
): Promise<void> => {
  try {
    // Create Profile
    const profile: ProfileFile = {
      avatar_image: avatarImage,
      name: name,
      created_at: Date.now(),
      updated_at: Date.now(),
      uuid: randomUUID(),
      stats: {
        games: 0,
        wins: 0,
        avg: 0,
        throws: 0,
        total_score: 0,
        missed_throws: 0,
      },
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
    throw new Error(
      "Error while creating profile file. Open the console for further information!"
    );
  }
};
