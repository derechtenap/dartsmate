import { NextPage } from "next";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import { Slide, toast } from "react-toastify";
import { getProfiles } from "hooks/useQuery";
import Avatar from "@/components/avatars/Avatar";
import { useState } from "react";
import {
  HiCog,
  HiDotsHorizontal,
  HiUserAdd,
  HiUserGroup,
  HiUserRemove,
} from "react-icons/hi";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createGame } from "utils/games/create";
import {
  APP_VERSION,
  GAME_MAX_LEGS,
  GAME_MAX_PLAYERS,
  GAME_MAX_SETS,
  GAME_SCORE_MODES,
} from "utils/constants";

const Lobby: NextPage = () => {
  const router = useRouter();
  const { isLoading, data } = getProfiles();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      scoreMode: 501,
      legs: 1,
      sets: 1,
      randomizePlayerOrder: true,
    },
  });

  const onSubmit = (data: any) => {
    return data;
  };

  const [backgroundBlur, setBackgroundBlur] = useState<boolean>(false);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);

  const handleGameStart = () => {
    const lobbySettings: GameFile = {
      score_mode: getValues("scoreMode"),
      legs: getValues("legs"),
      sets: getValues("sets"),
      randomize_player_order: false,
      players: selectedPlayers.map((player) => ({
        ...player,
        current_game: {
          score_left: getValues("scoreMode"),
          avg: 0,
          elapsed_throwing_time: 0,
          round_history: [],
        },
      })),
      uuid: crypto.randomUUID(),
      created_at: Date.now(),
      app_version: APP_VERSION,
      current_player: selectedPlayers[0].uuid,
      game_log: [
        {
          type: "INFO",
          message: "Game Started",
          timestamp: Date.now(),
        },
      ],
      game_status: "UNFINISHED",
    };

    createGame(lobbySettings);
    router.push(`game/${lobbySettings.uuid}/playing`);
  };

  const handlePlayerSelection = (player: ProfileFile) => {
    if (selectedPlayers.includes(player)) {
      const updatedSelectedPlayers = selectedPlayers.filter(
        (selectedPlayer) => selectedPlayer !== player
      );
      setSelectedPlayers(updatedSelectedPlayers);
      return;
    }

    if (selectedPlayers.length >= GAME_MAX_PLAYERS) {
      toast.error(
        `The lobby is full! You reached the maximum player capacity of ${GAME_MAX_PLAYERS}. Please remove a player, before you can add ${player.name} as a player.`,
        {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
          transition: Slide,
          className: "text-sm",
          icon: false,
          autoClose: 10000,
        }
      );
      return;
    }

    setSelectedPlayers((state) => [...state, player]);
  };

  if (isLoading) return <>Loading..</>;

  return (
    <SidebarLayout title="Lobby">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div
          className={`drawer-content flex flex-col ${
            backgroundBlur ? "blur" : ""
          }`}
        >
          <header className="w-full bg-base-200 p-4">
            <h1 className="text-white">Lobby</h1>
            <p className="mb-0">
              Please select all players who want to participate in the game. You
              can select up to {GAME_MAX_PLAYERS} players. Click on a player
              profile to add them the new game.
            </p>
          </header>

          <ul className="menu menu-horizontal w-full bg-base-300 text-white">
            <li>
              <label
                htmlFor="my-drawer"
                className="btn-ghost btn rounded-none"
                onClick={() => setBackgroundBlur(!backgroundBlur)}
              >
                <HiUserGroup /> Players
              </label>
            </li>
            <li className="mr-8 flex-1 items-center justify-end bg-base-200 font-mono text-xs uppercase">
              Players: {selectedPlayers.length} / {GAME_MAX_PLAYERS}{" "}
            </li>
            <li className="ml-auto">
              <button className="btn-disabled btn" disabled>
                <HiDotsHorizontal />
              </button>
            </li>
          </ul>

          <div className="flex w-full flex-1 items-start">
            <section className="grid w-full grid-cols-2 xl:grid-cols-4 xl:gap-y-16">
              {selectedPlayers.map((player) => (
                <div
                  className="card inline-flex items-center justify-center gap-y-4 rounded-none p-4 text-center transition-all hover:bg-base-300 xl:text-xl xl:font-bold"
                  key={player.uuid}
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
            <aside className="flex w-96 flex-col justify-between self-stretch overflow-hidden bg-base-200">
              <main className="p-4">
                <p className="flex items-center gap-4 text-xl font-bold">
                  <HiCog className="text-3xl hover:animate-spin" />
                  Settings
                </p>
                <form onChange={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <label className="label" htmlFor="score-mode">
                      <span className="label-text">Score Mode</span>
                    </label>
                    <select
                      className="select w-full max-w-xs px-4"
                      id="score-mode"
                      {...register("scoreMode")}
                    >
                      {GAME_SCORE_MODES.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Sets</span>
                    </label>
                    <input
                      type="number"
                      className="input-bordered input w-full"
                      disabled
                      {...register("sets")}
                      max={GAME_MAX_SETS}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Legs</span>
                    </label>
                    <input
                      type="number"
                      className="input-bordered input w-full"
                      disabled
                      {...register("legs")}
                      max={GAME_MAX_LEGS}
                    />
                  </div>
                  {/*

                  TODO: Currently disabled. Logic wont work properly!
                  The games will wont use a randomized order until this is
                  fixed...

                  <div className="form-control">
                    <label className="label" htmlFor="randomizePlayerOrder">
                      <span className="label-text">
                        Randomize player order?
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      id="randomizePlayerOrder"
                      name="randomizePlayerOrder"
                      onClick={() => handleCheckboxChange()}
                      checked={getValues("randomizePlayerOrder")}
                      value={getValues("randomizePlayerOrder")}
                      {...register("randomizePlayerOrder")}
                    />

                  </div>
                  */}
                </form>
              </main>
              <button
                className={`btn-primary btn h-32 w-full self-end rounded-none text-3xl ${
                  selectedPlayers.length < 1 ? "btn-disabled" : "animate-pulse"
                }`}
                {...(selectedPlayers.length < 1 ? { disabled: true } : {})}
                onClick={() => handleGameStart()}
              >
                Start Game
              </button>
            </aside>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={() => setBackgroundBlur(!backgroundBlur)}
          ></label>
          <ul className="menu w-80 bg-base-100 p-4 text-base-content">
            <li>
              <Button
                action={() => router.push("/profiles/createProfile?from=lobby")}
                color="ghost"
              >
                Create A New Profile
              </Button>
              <button disabled className="btn-disabled btn-ghost btn mt-2">
                Add Guest
              </button>
            </li>

            <li className="cursor-default border-b border-primary bg-transparent text-sm"></li>
            {data.map((player) => (
              <li className="flex flex-row" key={player.uuid}>
                <span
                  className="flex-1"
                  onClick={() => handlePlayerSelection(player)}
                >
                  <Avatar imgSrc={player.avatar_image} name={player.name} />
                  {player.name}
                </span>
                <button
                  className="text-2xl"
                  onClick={() => handlePlayerSelection(player)}
                >
                  {selectedPlayers.includes(player) ? (
                    <HiUserRemove />
                  ) : (
                    <HiUserAdd />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Lobby;
