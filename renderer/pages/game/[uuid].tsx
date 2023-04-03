import Avatar from "@/components/avatars/Avatar";
import Button from "@/components/Button";
import { getCurrentGame } from "hooks/getCurrentGame";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { GAME_SCORE_ZONES, GAME_THROWS_PER_ROUND } from "utils/constants";
import { useElapsedTime } from "use-elapsed-time";

const GamePage: NextPage = () => {
  const router = useRouter();
  const gameUUID = (router.query?.uuid as string) || undefined;
  const { isLoading, data: game } = getCurrentGame(gameUUID);
  const [isDouble, setIsDouble] = useState<boolean>(false);
  const [isTriple, setIsTriple] = useState<boolean>(false);
  const [throwHistory, setThrowHistory] = useState<number[]>([]);

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: true,
    updateInterval: 1,
  });

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

  const handleAddThrow = (selectedScore: number) => {
    let throwScore = selectedScore;

    // Check if the player already have the maximum amount of throws
    if (throwHistory.length >= GAME_THROWS_PER_ROUND) return;

    // If the selected score is 25 or 50 (bullseye or outer bull), add it to the
    // current throw history without multiplying the score.
    if (throwScore === 25 || throwScore === 50) {
      setThrowHistory((prev) => [...prev, throwScore]);
      return;
    }

    // Multiple the score when double or triple is selected
    if (isTriple) {
      throwScore *= 3;
    }

    if (isDouble) {
      throwScore *= 2;
    }

    setThrowHistory((prev) => [...prev, throwScore]);

    // Reset ui buttons
    setIsDouble(false);
    setIsTriple(false);
  };

  // Removes the last throw from the throw history
  const handleRemoveThrow = () => {
    if (throwHistory.length > 0) {
      const updatedHistory = [...throwHistory];
      updatedHistory.pop();

      setThrowHistory(updatedHistory);

      // Reset ui buttons
      setIsDouble(false);
      setIsTriple(false);
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
                  {...(throwHistory.length === 3 ? { disabled: true } : {})}
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
                  {...(throwHistory.length === 3 ? { disabled: true } : {})}
                >
                  Double
                </button>
                <button
                  className={`btn flex-1 rounded-none ${
                    isTriple ? "btn-primary" : ""
                  }`}
                  onClick={() => handleMultiplier("TRIPLE")}
                  {...(throwHistory.length === 3 ? { disabled: true } : {})}
                >
                  Triple
                </button>
                <Button
                  action={() => handleRemoveThrow()}
                  styles="flex-1 rounded-none"
                  {...(throwHistory.length === 0
                    ? { disabled: true }
                    : { disabled: false })}
                >
                  Undo
                </Button>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-7xl font-extrabold xl:mt-16 xl:text-9xl">
                  {throwHistory.reduce((sum, num) => sum + num, 0) || 0}
                </p>
                <ul
                  className="menu menu-horizontal gap-x-16 text-lg font-normal xl:text-2xl"
                  role="list"
                >
                  {throwHistory.map((throwResult, index) => (
                    <li key={index}>{throwResult}</li>
                  ))}
                </ul>
              </div>
              <Button
                action={() => console.info("NEXT_PLAYER_EVENT")}
                styles="btn-primary btn mt-auto w-full overflow-hidden rounded-none"
                {...(throwHistory.length === GAME_THROWS_PER_ROUND
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
