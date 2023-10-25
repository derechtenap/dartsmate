import { readdirSync, statSync } from "fs";
import path from "path";

/**
 *
 * Calculates the size of a folder by summing up the sizes of all files within it.
 *
 * @param {string} folderPath - The path to the folder for which to calculate the size.
 * @returns {number} The total size of the folder in bytes.
 *
 */
export const getFolderSize = (folderPath: string): number => {
  let folderSize = 0;

  try {
    const files = readdirSync(folderPath);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stats = statSync(filePath);

      // Check if it's a file (not a directory)
      if (stats.isFile()) {
        folderSize += stats.size;
      }
    });
  } catch (err) {
    console.error("Error reading folder:", err);
  }

  return folderSize;
};
