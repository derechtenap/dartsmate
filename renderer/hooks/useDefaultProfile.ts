import { useMutation, useQuery } from "@tanstack/react-query";
import type { Profile } from "types/profile";

export const key = "defaultProfile" as const;

export const useDefaultProfile = () => {
  return useQuery<Profile>({
    /*
     * The query runs regardless of network status, since the data is
     * fetched locally from the client's system
     */
    networkMode: "always",
    queryKey: [key],
    queryFn: () => {
      try {
        return window.ipc.getDefaultProfile();
      } catch (err) {
        console.error("Unable to get default profile! Error: ", err);
        throw err;
      }
    },
    /*
     * The data is considered always fresh and will not refetch
     * automatically
     */
    staleTime: Infinity,
  });
};

export const useMutateDefaultProfile = () => {
  return useMutation({
    networkMode: "always",
    mutationKey: [key],
    mutationFn: (newProfileData: Profile) => {
      return new Promise((resolve, reject) => {
        const updatedProfile = { ...newProfileData, updatedAt: Date.now() };

        try {
          const result = window.ipc.setDefaultProfile(updatedProfile);
          resolve(result);
        } catch (err) {
          console.error("Failed to update default profile! Error: ", err);
          reject(err);
        }
      });
    },
  });
};

export const useDeleteDefaultProfile = () => {
  return useMutation({
    networkMode: "always",
    mutationKey: [key],
    mutationFn: () => {
      return new Promise((resolve, reject) => {
        try {
          const result = window.ipc.deleteDefaultProfile();
          resolve(result);
        } catch (err) {
          console.error("Failed to delete default profile! Error: ", err);
          reject(err);
        }
      });
    },
  });
};
