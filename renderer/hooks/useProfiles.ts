import { useQuery } from "@tanstack/react-query";
import { readFileSync } from "fs";
import path from "path";
import { Profile } from "types/profile";
import { PROFILES_DIR } from "utils/constants";
import { readFolder } from "utils/fs/readFolder";

const getProfiles = () => {
  // Get profile files list from the app directory
  const files = readFolder(PROFILES_DIR);

  // Return the profile json data for each file
  return files.map((profileFile) => {
    const data = readFileSync(path.join(PROFILES_DIR, profileFile), "utf8");

    return JSON.parse(data) as Profile;
  });
};

export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(),
  });
};
