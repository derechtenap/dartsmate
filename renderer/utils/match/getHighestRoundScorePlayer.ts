import type { Player } from "types/match";

/**
 *
 * Gets the highest round score for a given player.
 *
 * @param {Player} player - The player object for whom to find the highest round score.
 * @returns {number} The highest round score for the player.
 *
 */
export const getHighestRoundScoreForPlayer = (player: Player): number => {
  let highestRoundScore = 0;

  player.rounds.forEach((round) => {
    if (round.roundTotal > highestRoundScore) {
      highestRoundScore = round.roundTotal;
    }
  });

  return highestRoundScore;
};
