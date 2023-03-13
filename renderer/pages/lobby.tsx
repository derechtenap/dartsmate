import { NextPage } from "next";

import { useEffect, useState } from "react";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { loadProfileList } from "utils/profiles/loadProfileList";
import { loadProfile } from "utils/profiles/load";

const Lobby: NextPage = () => {
  const [playerList, setPlayerList] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfiles([]);
    getProfiles();
  }, []);

  const getProfiles = async () => {
    // Load profiles from fs
    const profileList = loadProfileList();

    // Open each profile and write them into useState
    profileList.forEach((profile) => {
      loadProfile(profile).then((p) => setProfiles((state) => [...state, p]));
    });

    console.table(profiles);
    setIsLoading(false);
  };

  const removePlayer = (id: number) => {
    setPlayerList(playerList.splice(id + 1, 1));
  };

  if (isLoading) return <>Loading..</>;

  return (
    <SidebarLayout title="Lobby">
      <header className="bg-base-200 p-4">
        <h1 className="text-white">Lobby</h1>
        <p className="mb-0">
          Please select all players who want to participate in the game.
        </p>
      </header>
      <section className="m-2"></section>
    </SidebarLayout>
  );
};

export default Lobby;
