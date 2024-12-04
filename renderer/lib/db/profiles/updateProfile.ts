/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Profile } from "types/profile";

import database from "../database";

//  Prevent overriding `uuid` in the update payload
type PartialProfile = Omit<Partial<Profile>, "uuid">;

const updateProfileFromDatabase = async (
  updatedProfileData: PartialProfile,
  uuid: Profile["uuid"]
) => {
  await database
    .collection("profiles")
    .doc({ uuid })
    .update(updatedProfileData);
};

export default updateProfileFromDatabase;
