/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Match } from "types/match";

import database from "../database";
import collections from "../collections";

const deleteMatchFromDatabase = async (uuid: Match["matchUUID"]) => {
  await database.collection(collections.matches).doc({ uuid }).delete();
};

export default deleteMatchFromDatabase;
