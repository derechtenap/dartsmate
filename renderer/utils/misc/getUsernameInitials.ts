export const getUsernameInitials = (username: string) => {
  return username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 3); // Only get the first three characters
};
