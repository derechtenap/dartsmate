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
      <div className="m-16 rounded-xl border-2 border-dotted  bg-base-300 py-4 px-2 text-center">
        <HiUserAdd className="mx-auto mb-4 text-8xl" />
        <h1 className="mb-6 text-2xl font-bold text-white">
          Oh snap! The Lobby is currently empty...
        </h1>
        {!isLoading && (
          <p>
            We found{" "}
            <span className="font-bold">
              {profiles.length === 1
                ? "1 player profile"
                : `${profiles.length} player profiles`}
            </span>{" "}
            on your device. Would you like to add existing profiles?
          </p>
        )}
        <div className="mt-8 flex w-full items-center justify-center">
          <button className="btn btn-primary m-8">Add Player</button>
          <div className="divider divider-horizontal">OR</div>
          <button className="btn-outline btn btn-ghost btn-sm ml-8 mr-4">
            Create A New Player
          </button>
          <button className="btn btn-ghost btn-sm">Add Guest</button>
        </div>
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
