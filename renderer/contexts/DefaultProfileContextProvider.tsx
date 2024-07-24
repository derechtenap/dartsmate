import { createContext, useEffect, useState } from "react";
import type { Profile } from "types/profile";

type DefaultProfileContextType = {
  defaultProfile: Profile | undefined;
  handleDeleteProfile: () => void;
  handleEditProfile: (values: Profile) => void;
};

type DefaultProfileContextProviderProps = {
  children: React.ReactNode;
};

export const DefaultProfileContext =
  createContext<DefaultProfileContextType | null>(null);

const DefaultProfileContextProvider = ({
  children,
}: DefaultProfileContextProviderProps) => {
  const [defaultProfile, setDefaultProfile] = useState<Profile | undefined>(
    undefined
  );

  // Get Profile from the electron store via ipc
  useEffect(() => {
    void window.ipc.getDefaultProfile().then(setDefaultProfile);
  }, []);

  const handleDeleteProfile = () => {
    window.ipc.deleteDefaultProfile();
    setDefaultProfile(undefined);
  };

  const handleEditProfile = (values: Profile) => {
    const updatedProfile = { ...values, updatedAt: Date.now() };

    window.ipc.setDefaultProfile(updatedProfile);
    setDefaultProfile(updatedProfile);
  };

  return (
    <DefaultProfileContext.Provider
      value={{ defaultProfile, handleDeleteProfile, handleEditProfile }}
    >
      {children}
    </DefaultProfileContext.Provider>
  );
};

export default DefaultProfileContextProvider;
