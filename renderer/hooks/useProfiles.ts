import { useContext } from "react";
import { ProfilesContext } from "contexts/ProfilesContextProvider";

const useProfilesContext = () => {
  const context = useContext(ProfilesContext);

  if (!context) {
    throw new Error(
      "useProfileContext must be used within a DefaultProfileContextProvider!"
    );
  }

  return context;
};

export default useProfilesContext;
