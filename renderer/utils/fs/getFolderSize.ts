import { readdirSync, statSync } from "fs";
import path from "path";

export const getFolderSize = (folderPath: string) => {
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
