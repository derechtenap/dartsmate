/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Profile } from "types/profile";

import database from "../database";
import collections from "../collections";

const deleteProfileFromDatabase = async (uuid: Profile["uuid"]) => {
  await database.collection(collections.profiles).doc({ uuid }).delete();
};

export default deleteProfileFromDatabase;
