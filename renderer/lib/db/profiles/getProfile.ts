/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Profile } from "types/profile";

import database from "../database";
import collections from "../collections";

const getProfileFromDatabase = async (
  uuid: Profile["uuid"]
): Promise<Profile> => {
  const profile: Profile = await database
    .collection(collections.profiles)
    .doc({ uuid })
    .get();

  return profile;
};

export default getProfileFromDatabase;
