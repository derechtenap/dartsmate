import type { Player } from "types/match";
import type { Profile } from "types/profile";

/**
 * Constructs the formatted full name from a Profile or Player object.
 * @param {Profile["name"] | Player["name"]} name - The name object containing firstName and lastName properties.
 * @returns {string} The formatted full name as "firstName lastName".
 */
const getFormattedName = (name: Profile["name"] | Player["name"]): string => {
  return `${name.firstName} ${name.lastName}`;
};

export default getFormattedName;
