import { NextPage } from "next";

import { useEffect, useState } from "react";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { matchMaxPlayers as maxPlayers } from "utils/constants";

import { loadProfileList } from "utils/profiles/loadProfileList";
import { loadProfile } from "utils/profiles/load";
import { randomUUID } from "crypto";
import Button from "@/components/Button";
import Table from "@/components/table/Table";
import Avatar from "@/components/avatars/Avatar";

const Lobby: NextPage = () => {
  const [playerList, setPlayerList] = useState([]);
  const [profiles, setProfiles] = useState<ProfileFile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openProfileSelection, setOpenProfileSelection] = useState(false);

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

  const addPlayer = () => {
    if (selectedProfiles.length < maxPlayers) {
      setOpenProfileSelection(true);
      console.log(selectedProfiles);
    }

    return;
  };

  const removePlayer = (uuid: string) => {
    setSelectedProfiles((state) =>
      state.filter((profile) => profile.uuid !== uuid)
    );
  };

  if (isLoading) return <>Loading..</>;

  if (openProfileSelection)
    return (
      <ul>
        {profiles.map((profile) => (
          <>
            {!selectedProfiles.map((p) => p.name).includes(profile.name) ? (
              <li
                key={profile.uuid}
                onClick={() =>
                  setSelectedProfiles((state) => [...state, profile])
                }
              >
                {profile.name} <small>{profile.uuid}</small>
              </li>
            ) : (
              <></>
            )}
          </>
        ))}
        <li>
          <Button action={() => setOpenProfileSelection(false)}>
            DEBUG_CLOSE_VIEW
          </Button>
        </li>
      </ul>
    );

  return (
    <SidebarLayout title="Lobby">
      <header className="bg-base-200 p-4">
        <h1 className="text-white">Lobby</h1>
        <p className="mb-0">
          Please select all players who want to participate in the game.
        </p>
      </header>
      <section className="m-2">
        {`${selectedProfiles.length} / ${maxPlayers} Players`}

        <Button action={() => addPlayer()}>DEBUG_ADD_PLAYER</Button>

        <Table head={["name", ""]}>
          {selectedProfiles.map(
            ({ avatar_image: img, name, uuid }: ProfileFile) => (
              <tr key={uuid}>
                <td className="flex items-center gap-4">
                  <Avatar name={name} imgSrc={img} />
                  {name}
                </td>
                <td>
                  <Button
                    action={() => removePlayer(uuid)}
                    color="ghost"
                    size="sm"
                  >
                    DEBUG_REMOVE_PROFILE
                  </Button>
                </td>
              </tr>
            )
          )}
        </Table>

        <button
          className="btn-primary btn"
          disabled={selectedProfiles.length < 1}
          onClick={() => console.info("START_GAME!")}
        >
          DEBUG_START_GAME
        </button>
      </section>
    </SidebarLayout>
  );
};

export default Lobby;
