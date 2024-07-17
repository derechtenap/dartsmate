import type { DartThrow } from "types/match";

/**
 *
 * Calculates the total score for a darts round by summing up an
 * array of scores.
 *
 * The function will return `0` when the given array is empty.
 *
 * @param {number[]} scores - An array of scores for the darts round.
 * @returns {number} - The current total score for the darts round.
 *
 * @example
 * const roundScores = [10, 15, 20];
 * const totalScore = getRoundScore(roundScores); // Returns 45
 *
 */
export const getTotalRoundScore = (scores: number[]): number => {
  return scores.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0 // Fallback to `0`, when the given array is empty
  );
};

export const getScores = (rounds: DartThrow[]): number[] => {
  if (rounds.length === 0) return [];

  return rounds.map((round) => {
    return round.score;
  });
};
