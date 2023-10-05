import type { Checkout } from "types/match";

/**
 *
 * Checks if the player has busted based on their current score.
 * A player is considered busted if their score is less than or equal to 0.
 *
 * @param {number} currentScore - The player's current score.
 * @param {Checkout} checkout - The type of checkout ("Double" or "Triple").
 * @returns {boolean} `true` if the player has busted, otherwise `false`.
 */
export const isPlayerBusted = (
  currentScore: number,
  checkout: Checkout
): boolean => {
  if (checkout === "Double" || checkout === "Triple") {
    return currentScore <= checkoutValue(checkout);
  }

  return currentScore < 0;
};

/**
 *
 * Helper function to calculate the minimum score required for a checkout.
 *
 * @param {Checkout} checkout - The type of checkout ("Double" or "Triple").
 * @returns {number} The minimum score required for the checkout.
 */
const checkoutValue = (checkout: Checkout): number => {
  return checkout === "Double" ? 2 : 3;
};
