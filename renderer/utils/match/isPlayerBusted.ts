/**
 *
 * Checks if the player has busted based on their current score.
 * A player is considered busted if their score is less than 0.
 *
 * @param {number} currentScore - The player's current score.
 * @returns {boolean} `true` if the player has busted, otherwise `false`.
 *
 */
export const isPlayerBusted = (currentScore: number): boolean => {
  return currentScore < 0;
};
