import { NextPage } from "next";

import { useState } from "react";

import Avatar from "@/components/avatars/Avatar";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table from "@/components/table/Table";

import { matchMaxPlayers } from "utils/constants";

import { HiMinusCircle, HiUserAdd } from "react-icons/hi";

const Lobby: NextPage = () => {
  const [playerList, setPlayerList] = useState([]);

  const removePlayer = (id: number) => {
    setPlayerList(playerList.splice(id + 1, 1));
  };

  const EmptySate = () => {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border-4 border-dotted border-base-300 px-16 py-8 text-center">
        <HiUserAdd className="mx-auto mb-4 text-8xl" />
        <h1 className="mb-6 text-2xl font-bold text-white">
          Oh snap! The Lobby is currently empty...
        </h1>
        <p>You must add at least one player to continue.</p>
        <button
          className="btn-primary btn mt-8"
          onClick={() => setPlayerList(["New Player"])}
        >
          Add Player
        </button>
      </div>
    );
  };

  return (
    <SidebarLayout title="Lobby">
      <header className="bg-base-200 p-4">
        <h1 className="text-white">Lobby</h1>
        <p className="mb-0">
          Please select all players who want to participate in the game.
        </p>
      </header>
      <section className="m-2 flex flex-col">
        {playerList.length === 0 ? (
          <>{<EmptySate />}</>
        ) : (
          <>
            <p className="mx-2 my-1 text-right text-sm font-thin">
              {playerList.length} / {matchMaxPlayers} Players
            </p>
            <Table head={["Player", ""]}>
              {playerList.map((player, _idx) => (
                <tr key={player}>
                  <td className="flex items-center">
                    <Avatar name={player} />
                    <span className="ml-4">{player}</span>
                  </td>
                  <td>
                    <HiMinusCircle
                      className="text-xl text-error"
                      onClick={() => removePlayer(_idx)}
                    />
                  </td>
                </tr>
              ))}
            </Table>
          </>
        )}
      </section>
    </SidebarLayout>
  );
};

export default Lobby;
