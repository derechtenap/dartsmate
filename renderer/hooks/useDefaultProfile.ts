import { useContext } from "react";
import { DefaultProfileContext } from "contexts/DefaultProfileContextProvider";

const useDefaultProfileContext = () => {
  const context = useContext(DefaultProfileContext);

  if (!context) {
    throw new Error(
      "useDefaultProfileContext must be used within a DefaultProfileContextProvider!"
    );
  }

  return context;
};

export default useDefaultProfileContext;
