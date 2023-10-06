import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readFileSync } from "fs";
import path from "path";
import { Match } from "types/match";
import { MATCHES_DIR } from "utils/constants";
import { readFolder } from "utils/fs/readFolder";
import type { UUID } from "crypto";

const getCurrentMatch = (uuid?: UUID) => {
  const files = readFolder(MATCHES_DIR);

  // Find the file that matches the provided UUID
  const matchingFile = files.find((matchFile) => {
    const data = readFileSync(path.join(MATCHES_DIR, matchFile), "utf8");
    const match = JSON.parse(data) as Match;
    return match.matchUUID === uuid;
  });

  const data = readFileSync(
    path.join(MATCHES_DIR, matchingFile as string),
    "utf8"
  );
  return JSON.parse(data) as Match;
};

const addCurrentMatch = (uuid: UUID) => {
  const files = readFolder(MATCHES_DIR);

  const matchingFile = files.find((matchFile) => {
    const data = readFileSync(path.join(MATCHES_DIR, matchFile), "utf8");
    const match = JSON.parse(data) as Match;
    return match.matchUUID === uuid;
  });

  return matchingFile;
};

export const useCurrentMatch = (uuid: UUID) => {
  return useQuery({
    queryKey: ["currentMatch", uuid],
    queryFn: () => getCurrentMatch(uuid),
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAddCurrentMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Temporarily ignoring TypeScript errors type issues

    // No overload matches this call.
    // The last overload gave the following error.

    // Argument of type '{ mutationFn: (uuid: `${string}-${string}-${string}-
    // ${string}-${string}`) => string | undefined; onSuccess: () => void; }'
    // is not assignable to parameter of type 'MutationKey'.

    // Object literal may only specify known properties, and 'mutationFn' does
    // not exist in type 'readonly unknown[]'.
    mutationFn: (uuid: UUID) => addCurrentMatch(uuid),
    onSuccess: () => {
      // Remove old current match query
      void queryClient.invalidateQueries(["currentMatch"]);
      void queryClient.getQueryCache().clear();
    },
  });
};
