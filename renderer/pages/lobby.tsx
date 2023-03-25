import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { matchMaxPlayers as maxPlayers } from "utils/constants";
import { getProfiles } from "hooks/useQuery";
import Avatar from "@/components/avatars/Avatar";
import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const Lobby: NextPage = () => {
  const router = useRouter();
  const { isLoading, isError, data, error } = getProfiles();
  console.info(data);

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handlePlayerSelection = (player: ProfileFile) => {
    if (selectedPlayers.includes(player)) {
      const updatedSelectedPlayers = selectedPlayers.filter(
        (selectedPlayer) => selectedPlayer !== player
      );
      setSelectedPlayers(updatedSelectedPlayers);
      return;
    }

    if (selectedPlayers.length >= maxPlayers) return;

    setSelectedPlayers((state) => [...state, player]);
  };

  console.info(selectedPlayers);

  if (isLoading) return <>Loading..</>;

  return (
    <SidebarLayout title="Lobby">
      <header className="bg-base-200 p-4">
        <h1 className="text-white">Lobby</h1>
        <p className="mb-0">
          Please select all players who want to participate in the game. You can
          select up to {maxPlayers} players. Click on a player profile to add
          them the new game.
        </p>
        <p className="mt-4 font-bold">
          Currently{" "}
          {selectedPlayers.length === 1
            ? "1 player"
            : `${selectedPlayers.length} players`}{" "}
          have been selected.
        </p>
      </header>
      <section className="flex flex-wrap justify-center gap-4 py-4">
        <div className="card flex h-32 w-32 items-center justify-center rounded-none border border-base-300 p-4 transition-all hover:bg-base-300 xl:h-64 xl:w-64 xl:font-bold">
          <Button
            action={() => router.push("/profiles/createProfile?from=lobby")}
            color="ghost"
            size="lg"
          >
            Create A New Player
          </Button>
        </div>
        {data.map((player) => (
          <div
            className={`card inline-flex h-32 w-32 items-center justify-center gap-y-4 rounded-none bg-base-300 p-4 text-center transition-all hover:cursor-pointer xl:h-64 xl:w-64 xl:text-xl xl:font-bold ${
              selectedPlayers.includes(player)
                ? "bg-primary-focus"
                : "hover:animate-pulse"
            }`}
            key={player.uuid}
            onClick={() => handlePlayerSelection(player)}
            title={
              selectedPlayers.includes(player)
                ? `Remove ${player.name} from the game.`
                : `Add ${player.name} to the game.`
            }
          >
            <Avatar
              imgSrc={player.avatar_image}
              name={player.name}
              size="w-16 xl:w-32"
            />
            {player.name}
          </div>
        ))}
      </section>
    </SidebarLayout>
  );
};

export default Lobby;
