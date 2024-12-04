/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Profile } from "types/profile";

import database from "../database";

const getAllProfilesFromDatabase = async (): Promise<Profile[]> => {
  const profile: Profile[] = await database.collection("profiles").get();

  return profile;
};

export default getAllProfilesFromDatabase;
