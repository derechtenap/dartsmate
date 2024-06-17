import type { MatchRound } from "types/match";

/**
 *
 * Calculate the total average score from a player's match rounds.
 *
 * @param {MatchRound[]} playerRounds - An array of MatchRound objects representing the player's rounds.
 * @returns {number} The total average score
 *
 */
export const getTotalMatchAvg = (playerRounds: MatchRound[]): number => {
  if (playerRounds.length === 0) return 0;
  const averageScore =
    playerRounds.reduce((total, round) => total + round.roundTotal, 0) /
    playerRounds.length;

  return averageScore;
};
