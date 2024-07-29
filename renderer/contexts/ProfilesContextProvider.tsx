import { createContext, type ReactNode, useEffect, useState } from "react";
import type { Profile } from "types/profile";

type ProfilesContextType = {
  defaultProfile?: Profile;
  guestProfiles: Profile[] | [];
  deleteDefaultProfile: () => void;
  updateDefaultProfile: (values: Profile) => void;
};

type ProfilesContextProviderProps = {
  children: ReactNode;
};

export const ProfilesContext = createContext<ProfilesContextType | null>(null);

const ProfilesContextProvider = ({
  children,
}: ProfilesContextProviderProps) => {
  const [defaultProfile, setDefaultProfile] = useState<Profile | undefined>(
    undefined
  );

  const [guestProfiles, setGuestProfiles] = useState<Profile[] | []>([]);

  useEffect(() => {
    // Get default and guest profiles from the electron store
    window.ipc
      .getDefaultProfile()
      .then(setDefaultProfile)
      .catch((err) => {
        console.error("Unable to get default profile! Error: ", err);
      });

    window.ipc
      .getGuestProfiles()
      .then(setGuestProfiles)
      .catch((err) => {
        console.error("Unable to get guest profiles! Error: ", err);
      });
  }, []);

  const deleteDefaultProfile = () => {
    // TODO: Add check whether this code was executed successfully
    window.ipc.deleteDefaultProfile();
    setDefaultProfile(undefined);
  };

  const updateDefaultProfile = (values: Profile) => {
    const updatedProfile = { ...values, updatedAt: Date.now() };

    // TODO: Add check whether this code was executed successfully
    window.ipc.setDefaultProfile(updatedProfile);
    setDefaultProfile(updatedProfile);
  };

  return (
    <ProfilesContext.Provider
      value={{
        defaultProfile,
        guestProfiles,
        deleteDefaultProfile,
        updateDefaultProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export default ProfilesContextProvider;
