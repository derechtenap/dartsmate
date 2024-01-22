import type { Player } from "types/match";

/**
 *
 * Calculates the number of rounds in which a player's total score is above or equal to a specified threshold.
 *
 * @param {Player} player - The player object containing information about rounds.
 * @param {number} threshold - The threshold value to compare against round total scores.
 * @returns {number} - The number of rounds with a total score above or equal to the threshold.
 *
 */
export const getRoundsAboveThreshold = (
  player: Player,
  threshold: number
): number => {
  let roundsAboveThreshold = 0;

  player.rounds.forEach((round) => {
    /**
     *
     * Check if the round total score is greater than or equal to the specified threshold.
     * If true, increment the count of roundsAboveThreshold.
     *
     */
    if (round.roundTotal >= threshold) {
      roundsAboveThreshold++;
    }
  });

  return roundsAboveThreshold;
};
