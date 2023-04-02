import Avatar from "@/components/avatars/Avatar";
import Button from "@/components/Button";
import { getCurrentGame } from "hooks/getCurrentGame";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { GAME_SCORE_ZONES, GAME_THROWS_PER_ROUND } from "utils/constants";

const GamePage: NextPage = () => {
  const router = useRouter();
  const gameUUID = (router.query?.uuid as string) || undefined;
  const { isLoading, data: game } = getCurrentGame(gameUUID);
  const [isDouble, setIsDouble] = useState<boolean>(false);
  const [isTriple, setIsTriple] = useState<boolean>(false);
  const [currentThrowHistory, setCurrentThrowHistory] = useState<number[]>([]);

  const ZONES_WITH_MULTIPLIER = [
    ...GAME_SCORE_ZONES.map((value) => ({
      value,
      hasMultiplier: value !== 25 && value !== 50,
    })),
    {
      value: 0,
      hasMultiplier: false,
    },
  ];

  const handleMultiplier = (multiplier: "DOUBLE" | "TRIPLE") => {
    switch (multiplier) {
      case "DOUBLE":
        setIsDouble(!isDouble);
        setIsTriple(false);
        break;
      case "TRIPLE":
        setIsDouble(false);
        setIsTriple(!isTriple);
        break;
    }
  };

  const handleAddThrow = (points: number) => {
    if (currentThrowHistory.length >= 3) return;

    // TODO: Fix bug when triple or double is selected and the player
    // selected eg. bullseye and get a score of 150
    setCurrentThrowHistory((prev) => [
      ...prev,
      isDouble ? points * 2 : isTriple ? points * 3 : points,
    ]);
    setIsDouble(false);
    setIsTriple(false);
  };

  const handleRemoveThrow = () => {
    if (currentThrowHistory) {
      setCurrentThrowHistory(currentThrowHistory.slice(0, -1));
    }
  };

  // TODO: Add better handling
  if (!gameUUID) return <>GAME_UUID IS UNDEFINED!</>;
  if (isLoading) return <>Loading...</>;
  return (
    <>
      <Head>
        <title>Game - DartMate</title>
      </Head>
      <div className="flex w-full flex-col bg-base-300">
        <ul className="menu menu-horizontal w-full bg-base-300 text-white">
          <li>{game.uuid}</li>
          <li className="ml-auto">...</li>
        </ul>
        <main className="grid flex-1 grid-cols-2 gap-4">
          <section className="bg-base-200 p-4">
            {game.players.map((player) => (
              <div key={player.uuid}>{player.name}</div>
            ))}
          </section>

          <aside className="mr-4 flex flex-col gap-16 overflow-x-hidden">
            <div className="grid grid-cols-4 items-center">
              {ZONES_WITH_MULTIPLIER.map((zone) => (
                <button
                  className="btn-ghost btn h-full w-full rounded-none"
                  onClick={() => handleAddThrow(zone.value)}
                  {...(currentThrowHistory.length === 3
                    ? { disabled: true }
                    : {})}
                >
                  {zone.hasMultiplier
                    ? isDouble
                      ? zone.value * 2
                      : isTriple
                      ? zone.value * 3
                      : zone.value
                    : zone.value}
                </button>
              ))}
            </div>
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full" role="group">
                <button
                  className={`btn flex-1 rounded-none border-none ${
                    isDouble ? "btn-primary" : ""
                  }`}
                  onClick={() => handleMultiplier("DOUBLE")}
                  {...(currentThrowHistory.length === 3
                    ? { disabled: true }
                    : {})}
                >
                  Double
                </button>
                <button
                  className={`btn flex-1 rounded-none ${
                    isTriple ? "btn-primary" : ""
                  }`}
                  onClick={() => handleMultiplier("TRIPLE")}
                  {...(currentThrowHistory.length === 3
                    ? { disabled: true }
                    : {})}
                >
                  Triple
                </button>
                <Button
                  action={() => handleRemoveThrow()}
                  styles="flex-1 rounded-none"
                  {...(currentThrowHistory.length === 0
                    ? { disabled: true }
                    : { disabled: false })}
                >
                  Undo
                </Button>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-7xl font-extrabold xl:mt-16 xl:text-9xl">
                  {currentThrowHistory.reduce((sum, num) => sum + num, 0) || 0}
                </p>
                <ul
                  className="menu menu-horizontal gap-x-16 text-lg font-normal xl:text-2xl"
                  role="list"
                >
                  {currentThrowHistory.map((throwResult, index) => (
                    <li key={index}>{throwResult}</li>
                  ))}
                </ul>
              </div>
              <Button
                action={() => console.info("NEXT_PLAYER_EVENT")}
                styles="btn-primary btn mt-auto w-full overflow-hidden rounded-none"
                {...(currentThrowHistory.length === GAME_THROWS_PER_ROUND
                  ? { disabled: false }
                  : { disabled: true })}
              >
                Next
              </Button>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default GamePage;
