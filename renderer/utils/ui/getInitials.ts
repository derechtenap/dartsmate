/**
 * Returns the first three initials of a name.
 *
 * @param {string} playerName - The name of the player.
 * @returns {string} The first three initials of the player name.
 *
 * @example
 * // Returns "LS" for "Luke Skywalker" or "C" for "C-3PO"
 * getInitials("Luke Skywalker");
 */

export const getInitials = (playerName: string): string => {
  return playerName
    .split(" ")
    .map((char) => char.charAt(0))
    .slice(0, 3)
    .join("");
};
