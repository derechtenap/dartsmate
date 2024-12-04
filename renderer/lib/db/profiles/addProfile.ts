/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Profile } from "types/profile";

import database from "../database";

const addProfileToDatabase = (profile: Profile) => {
  database.collection("profiles").add(profile, profile.uuid);
};

export default addProfileToDatabase;
