/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Match } from "types/match";

import database from "../database";
import collections from "../collections";

const getMatchFromDatabase = async (
  uuid: Match["matchUUID"]
): Promise<Match> => {
  const match: Match = await database
    .collection(collections.matches)
    .doc({ uuid })
    .get();

  return match;
};

export default getMatchFromDatabase;
