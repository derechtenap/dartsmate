/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { Match } from "types/match";

import database from "../database";
import collections from "../collections";

const addMatchToDatabase = (match: Match) => {
  database.collection(collections.matches).add(match, match.matchUUID);
};

export default addMatchToDatabase;
