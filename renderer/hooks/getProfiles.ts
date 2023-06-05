/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useQuery } from "@tanstack/react-query";

import { loadProfile, readProfileDir } from "utils/profiles/load";

const loadProfiles = async () => {
  let profilesList: string[] = [];

  try {
    profilesList = readProfileDir();
  } catch (error) {
    console.error(error);
    profilesList = [];
  } finally {
    console.info(profilesList);
  }

  return Promise.all(
    profilesList.map((p: string) => {
      return loadProfile(p);
    })
  );
};

export const getProfiles = () => {
  return useQuery<ProfileFile[], Error>({
    queryKey: ["profiles"],
    queryFn: loadProfiles,
    select: (players) => players,
  });
};
