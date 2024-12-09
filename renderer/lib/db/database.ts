import Dexie, { type EntityTable } from "dexie";

import { APP_NAME } from "utils/constants";

import type { Match } from "types/match";
import type { Profile } from "types/profile";

const lowerCasedAppName = APP_NAME.toLowerCase();

const database = new Dexie(lowerCasedAppName) as Dexie & {
  matches: EntityTable<Match>;
  profiles: EntityTable<Profile>;
};

// & = Unique index
database.version(1).stores({
  matches: "&uuid",
  profiles: "&uuid",
});

export default database;
