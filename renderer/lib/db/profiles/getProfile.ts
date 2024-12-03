/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Profile } from "types/profile";

import database from "../database";

const getProfileFromDatabase = async (
  uuid: Profile["uuid"]
): Promise<Profile> => {
  const profile: Profile = await database
    .collection("profiles")
    .doc({ uuid })
    .get();

  return profile;
};

export default getProfileFromDatabase;
