/**
 *
 * Get the initials of a username by taking the first character of each word and capitalizing them.
 * If the resulting initials exceed the specified maximum number of characters, only the first 3
 * characters are returned.
 *
 * @param {string} username - The username from which to generate initials.
 * @returns {string} The initials of the username.
 *
 * @example
 * const username = "john doe doe";
 * const initials = getUsernameInitials(username); // Returns "JDD"
 *
 */
export const getUsernameInitials = (username: string): string => {
  return username
    .split(" ") // Split the username into words
    .map((word) => word.charAt(0).toUpperCase()) // Capitalize the first character of each word
    .join("")
    .slice(0, 3);
};
