/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Profile } from "types/profile";

import database from "../database";

const deleteProfileFromDatabase = async (uuid: Profile["uuid"]) => {
  await database.collection("profiles").doc({ uuid }).delete();
};

export default deleteProfileFromDatabase;
