/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Profile } from "types/profile";

import database from "../database";
import collections from "../collections";

const addProfileToDatabase = (profile: Profile) => {
  database.collection(collections.profiles).add(profile, profile.uuid);
};

export default addProfileToDatabase;
