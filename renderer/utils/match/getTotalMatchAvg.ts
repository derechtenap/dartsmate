import type { MatchRound } from "types/match";

/**
 *
 * Calculate the total average score from a player's match rounds.
 *
 * @param {MatchRound[]} playerRounds - An array of MatchRound objects representing the player's rounds.
 * @returns {number} The players average round score. Returns 0 if the player hasn't played any rounds
 *
 */
export const getTotalMatchAvg = (playerRounds: MatchRound[]): number => {
  // Return 0 when the player haven't player one round
  if (playerRounds.length === 0) return 0;

  const sumOfScores = playerRounds.reduce(
    (total, roundScore) => total + roundScore.roundTotal,
    0
  );

  const averageScore = sumOfScores / playerRounds.length;

  return averageScore;
};
