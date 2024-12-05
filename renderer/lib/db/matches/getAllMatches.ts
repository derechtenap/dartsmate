/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Match } from "types/match";

import database from "../database";
import collections from "../collections";

const getAllMatchesFromDatabase = async (): Promise<Match[]> => {
  const matches: Match[] = await database.collection(collections.matches).get();

  return matches;
};

export default getAllMatchesFromDatabase;
