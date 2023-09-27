import { writeFileSync } from "fs";
import path from "path";
import type { Match } from "types/match";
import { MATCHES_DIR, MATCH_FILENAME_EXTENSION } from "utils/constants";

/**
 *
 * Handles aborting a match, updates its status to "ABORTED" and writes the
 * modified match data to the file system.
 *
 * @param {Match} currentMatchData - The current match data
 *
 */
export const handleAbortMatch = (currentMatchData: Match): void => {
  const finalMatchData = {
    ...currentMatchData,
    matchStatus: "ABORTED",
    updatedAt: Date.now(),
  };
  const matchFilePath = path.join(
    MATCHES_DIR,
    finalMatchData.matchUuid + MATCH_FILENAME_EXTENSION
  );

  writeFileSync(matchFilePath, JSON.stringify(finalMatchData), "utf8");
};
