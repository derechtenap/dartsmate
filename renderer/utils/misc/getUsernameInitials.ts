/**
 *
 * Get the initials of a username by taking the first character of each word.
 * If the resulting initials exceed the specified maximum number of characters,
 * only the first 3 characters are returned.
 *
 * @param {string} username - The username from which to generate initials.
 * @returns {string} The initials of the username.
 *
 * @example
 * const username = "john doe";
 * const initials = getUsernameInitials(username); // Returns "JD"
 *
 */
export const getUsernameInitials = (username: string): string => {
  return username
    .split(' ') // Split the username into parts based on spaces
    .map((words) => words.charAt(0)) // Get the first char of each username part
    .join('')
    .slice(0, 3) // Only return the first 3 characters
}
