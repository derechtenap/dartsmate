import { NextPage } from "next";

import { useEffect, useState } from "react";

import Avatar from "@/components/avatars/Avatar";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table from "@/components/table/Table";

import { matchMaxPlayers } from "utils/constants";

import { HiMinusCircle, HiUserAdd } from "react-icons/hi";
import { loadProfileList } from "utils/profiles/loadProfileList";
import { loadProfile } from "utils/profiles/loadProfile";
import { profileDir } from "utils/profiles/profileFolderHandling";

const Lobby: NextPage = () => {
  const [playerList, setPlayerList] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfiles();
    console.log(profiles);
  }, [isLoading]);

  const getProfiles = async () => {
    // Load profiles from fs
    const profileList = loadProfileList();
    console.info(profileList);

    // Open each profile and write them into useState
    profileList.forEach((profile) => {
      loadProfile(profile).then((p) => setProfiles((state) => [...state, p]));
    });

    setIsLoading(false);
  };

  const removePlayer = (id: number) => {
    setPlayerList(playerList.splice(id + 1, 1));
  };

  const EmptySate = () => {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-16 py-8 text-center">
        <HiUserAdd className="mx-auto mb-4 text-8xl" />
        <h1 className="mb-6 text-2xl font-bold text-white">
          Oh snap! The Lobby is currently empty...
        </h1>
        <p>You must add at least one player to continue.</p>
        <button className="btn-primary btn mt-8">Add Player</button>
      </div>
    );
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
      <section className="m-2">
        {playerList.length === 0 ? <EmptySate /> : <></>}
      </section>
    </SidebarLayout>
  );
};

export default Lobby;
