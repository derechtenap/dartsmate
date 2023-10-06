import type { Checkout } from "types/match";

/**
 *
 * Checks if the player has busted based on their current score and the chosen checkout.
 *
 * @param {number} currentScore - The player's current score.
 * @param {Checkout} checkout - The type of checkout ("Double" or "Triple").
 * @returns {boolean} `true` if the player has busted, otherwise `false`.
 *
 */
export const isPlayerBusted = (
  currentScore: number,
  checkout: Checkout
): boolean => {
  if (currentScore === 0) return false;

  if (checkout === "Double" && currentScore < checkoutValue("Double")) {
    return true;
  }
  if (checkout === "Triple" && currentScore < checkoutValue("Triple")) {
    return true;
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
