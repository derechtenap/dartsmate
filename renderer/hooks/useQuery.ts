import { loadProfile, readProfileDir } from "utils/profiles/load";

import { useQuery } from "@tanstack/react-query";

const loadProfiles = async () => {
  const getProfileList = await readProfileDir();

  return Promise.all(
    getProfileList.map((p) => {
      return loadProfile(p);
    })
  );
};

export const getProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: loadProfiles,
    select: (data) => data as ProfileFile[],
  });
};