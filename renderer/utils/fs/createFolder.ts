import { mkdir } from "fs";

export const createFolder = (path: string) => {
  mkdir(path, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
};
