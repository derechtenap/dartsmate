import Avatar from "@/components/avatars/Avatar";
import Button from "@/components/Button";
import Table from "@/components/table/Table";
import { getCurrentGame } from "hooks/getCurrentGame";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiClock,
  HiDocumentSearch,
  HiDotsHorizontal,
  HiX,
} from "react-icons/hi";
import { GAME_SCORE_ZONES, GAME_THROWS_PER_ROUND } from "utils/constants";
import { useElapsedTime } from "use-elapsed-time";
import { toast } from "react-toastify";
import { loadGame } from "utils/games/load";
import { createGame } from "utils/games/create";

const GamePage: NextPage = () => {
  const router = useRouter();
  const gameUUID = (router.query?.uuid as string) || undefined;
  const { isLoading, data: game, refetch } = getCurrentGame(gameUUID);
  const [roundScore, setRoundScore] = useState<number>(0);
  const [multipliers, setMultipliers] = useState({
    isDouble: false,
    isTriple: false,
  });
  const [throwHistory, setThrowHistory] = useState<Throw[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>(undefined);

  useEffect(() => {
    if (game) {
      setCurrentPlayer(game.current_player);
    }
  }, [game]);

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: true,
    updateInterval: 1,
  });

  const resetButtons = () => {
    setMultipliers({ isDouble: false, isTriple: false });
  };

  const handleMultiplier = (multiplier: MultiplierType) => {
    const multipliers = {
      DOUBLE: {
        isDouble: true,
        isTriple: false,
      },
      TRIPLE: {
        isDouble: false,
        isTriple: true,
      },
    };

    const { isDouble, isTriple } = multipliers[multiplier];
    setMultipliers({ isDouble: isDouble, isTriple: isTriple });
  };

  const handleThrowInput = (dartboardPointsZone: number) => {
    // Abort the function if the player already have the maximum
    // amount of throws in this round
    if (throwHistory.length >= GAME_THROWS_PER_ROUND) return;

    let newThrow: Throw = {
      zone: dartboardPointsZone,
      score: 0,
      round_avg: 0,
      is_double: false,
      is_triple: false,
      is_outer_bull: false,
      is_bullseye: false,
      is_missed: false,
    };

    newThrow.score = newThrow.zone;

    // Update the throw object based on the value of the dartboardPointsZone:
    // - If the value is 0, mark the throw as a missed throw.
    // - If the value is 25, mark the throw as an outer bull.
    // - If the value is 50, mark the throw as a bullseye.
    // - If the value is any other number, update the throw points based on the value,
    //   and mark it as a double or triple throw if applicable.
    switch (newThrow.zone) {
      case 0:
        newThrow.is_missed = true;
        break;
      case 25:
        newThrow.is_outer_bull = true;
        break;
      case 50:
        newThrow.is_bullseye = true;
        break;
      default:
        if (multipliers.isDouble) {
          newThrow.is_double = true;
          newThrow.score = dartboardPointsZone * 2;
        }
        if (multipliers.isTriple) {
          newThrow.is_triple = true;
          newThrow.score = dartboardPointsZone * 3;
        }
        break;
    }

    // Calculate the average score for the round
    const updatedThrowHistory = [...throwHistory, newThrow];
    const totalScore = updatedThrowHistory.reduce(
      (sum, newThrow) => sum + newThrow.score,
      0
    );

    newThrow.round_avg = totalScore / updatedThrowHistory.length;
    setRoundScore(totalScore);
    setThrowHistory(updatedThrowHistory);
    resetButtons();
  };

  // Removes the last throw from the throw history
  const handleRemoveThrow = () => {
    if (throwHistory.length > 0) {
      const updatedHistory = [...throwHistory];
      updatedHistory.pop();

      setThrowHistory(updatedHistory);
      resetButtons();
    }
  };

  const handleAbortGame = () => {
    // Show Toast and then abort game
    toast(
      <>
        <h1 className="text-2xl">Abort Game?</h1>
        <p>Do you really want to abort the current game?</p>
        <div className="flex gap-4">
          <button
            className="btn-outline btn-error btn"
            onClick={abortCurrentGame}
          >
            Yes
          </button>
          <button className="btn" onClick={() => toast.dismiss()}>
            No
          </button>
        </div>
      </>,
      {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  const abortCurrentGame = async () => {
    // Close toast and update game file
    toast.dismiss();
    const newGameLog = game.game_log.concat({
      type: "INFO",
      message: "Game Aborted",
      timestamp: Date.now(),
    });

    const oldFile: GameFile = await loadGame(gameUUID);
    const updatedFile = {
      ...oldFile,
      game_status: "ABORTED",
      game_log: newGameLog,
    };

    // Update the file and navigate to main menu
    await createGame(updatedFile);
    router.push("/");
  };

  const handleGameUpdate = async () => {
    const oldFile: GameFile = await loadGame(gameUUID);

    const currentPlayerIndex = oldFile.players.findIndex(
      (player) => player.uuid === currentPlayer
    );

    const nextPlayerIndex = (currentPlayerIndex + 1) % oldFile.players.length;
    const nextPlayer = oldFile.players[nextPlayerIndex].uuid;

    const updatedPlayers = oldFile.players.map((player) => {
      if (player.uuid === currentPlayer) {
        const {
          avg: prevAvg,
          elapsed_throwing_time: prevElapsedTime,
          round_history: prevRoundHistory,
          score_left: prevScoreLeft,
        } = player.current_game;

        const newScoreLeft =
          prevScoreLeft -
            throwHistory.reduce((sum, throwObj) => sum + throwObj.score, 0) ||
          0;

        const newThrowingTime = prevElapsedTime + elapsedTime;

        const avgThisRound = prevScoreLeft - newScoreLeft;

        const newAvg =
          prevRoundHistory.length === 0
            ? avgThisRound
            : (prevAvg + avgThisRound) / 2;

        return {
          ...player,
          current_game: {
            score_left: newScoreLeft,
            avg: newAvg,
            elapsed_throwing_time: newThrowingTime,
            round_history: [
              ...prevRoundHistory,
              {
                elapsed_throwing_time: elapsedTime,
                throws: throwHistory,
                round_score: roundScore,
              },
            ],
          },
        };
      } else {
        return player;
      }
    });

    const updatedFile = {
      ...oldFile,
      current_player: nextPlayer,
      players: updatedPlayers,
    };

    // Update / recreate the game file on the filesystem and refetch the data.
    // Then reset elapsed throwing time, throw history and button states
    await createGame(updatedFile).then(() => {
      refetch();
      reset();
      setThrowHistory([]);
      setRoundScore(0);
      resetButtons();
    });
  };

  if (!gameUUID || !game) {
    return (
      <div className="alert rounded-none" role="alert">
        <div className="flex-col items-start">
          <h1 className="text-4xl font-bold">Oh snap, an error occurred!</h1>
          <p className="mb-8 text-2xl">
            The Game was aborted. Please try to create a new game via the lobby.
          </p>

          <Button action={() => router.push("/lobby")} color="primary">
            Back to the Lobby
          </Button>
        </div>
      </div>
    );
  }

  // TODO: Create Loading component
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Head>
        <title>Game - DartMate</title>
      </Head>
      <div className="flex w-full flex-col bg-base-300">
        <ul className="menu menu-horizontal w-full items-center bg-base-100 pl-4 text-white">
          <li>
            Custom Game - Mode: {game.players.length} Player - {game.score_mode}{" "}
            Double Out
          </li>
          <li className="ml-auto">
            <span className="btn-link btn cursor-default text-white decoration-transparent">
              <HiClock />
              Throwing Time: {elapsedTime}
            </span>
          </li>
          <li>
            <Button
              action={() => console.info("")}
              color="ghost"
              styles="rounded-none"
              {...{ disabled: true }}
            >
              <HiDocumentSearch /> Game Log
            </Button>
          </li>
          <li>
            <Button
              action={() => handleAbortGame()}
              color="ghost"
              styles="rounded-none"
            >
              <HiX /> Abort Game
            </Button>
          </li>
          <li>
            <Button
              action={() => console.info("")}
              color="ghost"
              {...{ disabled: true }}
              styles="rounded-none"
            >
              <HiDotsHorizontal />
            </Button>
          </li>
        </ul>
        <main className="grid flex-1 grid-cols-2 gap-4">
          <section className="bg-base-200">
            <Table head={["Player", "Score", "AVG"]}>
              {game.players.map(
                ({
                  avatar_image: avatar,
                  current_game: { avg, score_left },
                  name,
                  uuid,
                }) => (
                  <tr key={uuid}>
                    <td
                      className={
                        currentPlayer === uuid ? "bg-primary text-white" : ""
                      }
                    >
                      <span className="flex items-center gap-4">
                        <Avatar imgSrc={avatar} name={name} /> {name}
                      </span>
                    </td>
                    <td
                      className={
                        currentPlayer === uuid ? "bg-primary text-white" : ""
                      }
                    >
                      {new Intl.NumberFormat().format(score_left)}
                    </td>
                    <td
                      className={
                        currentPlayer === uuid ? "bg-primary text-white" : ""
                      }
                    >
                      {new Intl.NumberFormat().format(avg)}
                    </td>
                  </tr>
                )
              )}
            </Table>
          </section>

          <aside className="mr-4 flex flex-col gap-16 overflow-x-hidden">
            <div className="grid grid-cols-4 items-center">
              {GAME_SCORE_ZONES.map((zone) => (
                <button
                  className="btn-ghost btn h-full w-full rounded-none"
                  key={zone}
                  onClick={() => handleThrowInput(zone)}
                  {...(throwHistory.length === 3 ? { disabled: true } : {})}
                >
                  {zone}
                </button>
              ))}
            </div>
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full" role="group">
                <button
                  className={`btn flex-1 rounded-none border-none ${
                    multipliers.isDouble ? "btn-primary" : ""
                  }`}
                  onClick={() => handleMultiplier("DOUBLE")}
                  {...(throwHistory.length === 3 ? { disabled: true } : {})}
                >
                  Double
                </button>
                <button
                  className={`btn flex-1 rounded-none ${
                    multipliers.isTriple ? "btn-primary" : ""
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
                  {throwHistory.reduce((sum, { score }) => sum + score, 0) || 0}
                </p>
                <ul
                  className="menu menu-horizontal gap-x-16 text-lg font-normal xl:text-2xl"
                  role="list"
                >
                  {throwHistory.map(({ score }, _idx) => (
                    <li key={_idx}>{score}</li>
                  ))}
                </ul>
              </div>
              <Button
                action={() => handleGameUpdate()}
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
