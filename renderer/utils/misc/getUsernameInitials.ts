type Props = {
  maxInitials?: number;
  username: string;
};

/**
 *
 * Get the initials of a username by taking the first character of each word and capitalizing them.
 * If the resulting initials exceed the specified maximum number of characters, only the first 'maxInitials' characters are returned.
 *
 * @param {string} username - The username from which to generate initials.
 * @param {number} [maxInitials] - The maximum number of characters for the initials. Default is 3.
 * @returns {string} The initials of the username (up to 'maxInitials' characters).
 *
 * @example
 * const username = "john doe doe";
 * const initials = getUsernameInitials(username); // Returns "JDD"
 * const limitedInitials = getUsernameInitials(username, 2); // Returns "JD" (limited to 2 characters)
 */
export const getUsernameInitials = ({
  maxInitials,
  username,
}: Props): string => {
  maxInitials ? maxInitials : 3; // Fallback to 3 chars, when maxInitials was not passed

  return username
    .split(" ") // Split the username into words
    .map((word) => word.charAt(0).toUpperCase()) // Capitalize the first character of each word
    .join("")
    .slice(0, maxInitials);
};
