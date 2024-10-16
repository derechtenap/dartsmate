import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Profile } from "types/profile";
import log from "electron-log/renderer";
import { NIL as NIL_UUID } from "uuid";

export const key = "defaultProfile" as const;

export const useDefaultProfile = () => {
  return useQuery<Profile>({
    queryKey: [key],
    queryFn: () => {
      try {
        return window.ipc.getDefaultProfile();
      } catch (err) {
        log.error("Unable to get default profile! Error: ", err);
        return {
          avatarImage: undefined,
          bio: "",
          color: "blue",
          createdAt: 0,
          isGuestProfile: false,
          name: {
            firstName: "",
            lastName: "",
          },
          updatedAt: 0,
          username: "",
          uuid: NIL_UUID,
        };
      }
    },
  });
};

export const useMutateDefaultProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: (newProfileData: Profile) => {
      return new Promise((resolve, reject) => {
        const updatedProfile = { ...newProfileData, updatedAt: Date.now() };

        try {
          const result = window.ipc.setDefaultProfile(updatedProfile);
          resolve(result);
        } catch (err) {
          log.error("Failed to update default profile! Error: ", err);
          reject(err);
        }
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [key],
      });
    },
    onError: (err) => {
      log.error(err);
    },
  });
};

export const useDeleteDefaultProfile = () => {
  return useMutation({
    mutationKey: [key],
    mutationFn: () => {
      return new Promise((resolve, reject) => {
        try {
          const result = window.ipc.deleteDefaultProfile();
          resolve(result);
        } catch (err) {
          log.error("Failed to delete default profile! Error: ", err);
          reject(err);
        }
      });
    },
    onSuccess: () => {
      // TODO: Do something on success?! :)
    },
    onError: (err) => {
      log.error(err);
    },
  });
};
