import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { matchMaxPlayers as maxPlayers } from "utils/constants";
import { getProfiles } from "hooks/useProfileData";

const Lobby: NextPage = () => {
  const { isLoading, isError, data, error } = getProfiles();
  console.info(isLoading, isError, data, error);

  if (isLoading) return <>Loading..</>;

  return (
    <SidebarLayout title="Lobby">
      <header className="bg-base-200 p-4">
        <h1 className="text-white">Lobby</h1>
        <p className="mb-0">
          Please select all players who want to participate in the game.
        </p>
      </header>
    </SidebarLayout>
  );
};

export default Lobby;
