import Avatar from "@/components/avatars/Avatar";
import Button from "@/components/Button";
import Table from "@/components/table/Table";
import { getCurrentGame } from "hooks/getCurrentGame";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  HiClock,
  HiDocumentSearch,
  HiDotsHorizontal,
  HiX,
} from "react-icons/hi";
import { GAME_SCORE_ZONES, GAME_THROWS_PER_ROUND } from "utils/constants";
import { useElapsedTime } from "use-elapsed-time";
import { toast } from "react-toastify";
import { handleAbortCurrentGame } from "utils/games/logic/abortCurrentGame";
import { handlePlayerThrow } from "utils/games/logic/handlePlayerThrow";
import { handleRoundUpdate } from "utils/games/logic/handleRoundUpdate";
import { createGameLogEntry } from "utils/misc/createGameLogEntry";
import { createGame } from "utils/games/create";

const GamePage: NextPage = () => {
  const router = useRouter();
  const gameUUID = router.query?.uuid as string;
  const { isLoading, data: game, refetch } = getCurrentGame(gameUUID);
  const [roundScore, setRoundScore] = useState<number>(0);
  const [multipliers, setMultipliers] = useState<{
    isDouble: boolean;
    isTriple: boolean;
  }>({
    isDouble: false,
    isTriple: false,
  });
  const [roundThrowLog, setRoundThrowLog] = useState<Throw[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [winner, setWinner] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (game) {
      setCurrentPlayer(game.current_player);
      setWinner(game.winner);
    }

    // Handle finishing game
    if (winner && game) {
      const updatedGameFile: GameFile = {
        ...game,
        game_status: "FINISHED",
        game_log: createGameLogEntry(
          game.game_log,
          "INFO",
          `Player with uuid ${currentPlayer} won the game!`
        ),
      };

      createGame(updatedGameFile).then(() => {
        setWinner(undefined);
        router.push(`/game/${gameUUID}/results`);
      });
    }
  }, [game, winner]);

  const playerScoreLeft = useMemo(() => {
    return (
      game?.players.find((player) => player.uuid === currentPlayer)
        ?.current_game.score_left ?? 0
    );
  }, [currentPlayer, game]);

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
    const { newThrow, updatedThrowLog } = handlePlayerThrow(
      dartboardPointsZone,
      roundThrowLog,
      multipliers.isDouble,
      multipliers.isTriple
    );

    setRoundScore(newThrow.score);
    setRoundThrowLog(updatedThrowLog);
    resetButtons();
  };

  const handleRemoveThrow = () => {
    if (!roundThrowLog.length) return;

    setRoundThrowLog((prevLog) => prevLog.slice(0, -1));
    resetButtons();
  };

  const handleAbortGame = () => {
    // Show Toast and then abort game
    toast(
      <>
        <h1 className="text-2xl">Abort Game?</h1>
        <p>Do you really want to abort the current game?</p>
        <div className="flex gap-4">
          <Button
            action={() =>
              handleAbortCurrentGame(gameUUID).then(() => {
                toast.dismiss();
                router.push(`/game/${gameUUID}/results`);
              })
            }
            styles="btn-error btn-outline btn"
          >
            Yes
          </Button>
          <Button action={() => toast.dismiss()} styles="btn">
            No
          </Button>
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

  const handleNextPlayerTurn = async () => {
    await handleRoundUpdate(
      currentPlayer,
      elapsedTime,
      roundScore,
      roundThrowLog,
      gameUUID
    ).then(() => {
      refetch();
      reset();
      setRoundThrowLog([]);
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
                <Button
                  action={() => handleThrowInput(zone)}
                  styles="btn btn-ghost rounded-none"
                  key={zone}
                  {...(roundThrowLog.length === 3 ? { disabled: true } : {})}
                >
                  {zone}
                </Button>
              ))}
            </div>
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full" role="group">
                <Button
                  action={() => handleMultiplier("DOUBLE")}
                  styles={`btn flex-1 rounded-none border-none ${
                    multipliers.isDouble ? "btn-primary" : ""
                  }`}
                  {...(roundThrowLog.length === 3 ? { disabled: true } : {})}
                >
                  Double
                </Button>
                <Button
                  action={() => handleMultiplier("TRIPLE")}
                  styles={`btn flex-1 rounded-none ${
                    multipliers.isTriple ? "btn-primary" : ""
                  }`}
                  {...(roundThrowLog.length === 3 ? { disabled: true } : {})}
                >
                  Triple
                </Button>
                <Button
                  action={() => handleRemoveThrow()}
                  styles="flex-1 rounded-none"
                  {...(roundThrowLog.length === 0
                    ? { disabled: true }
                    : { disabled: false })}
                >
                  Undo
                </Button>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-7xl font-extrabold xl:mt-16 xl:text-9xl">
                  {roundThrowLog.reduce((sum, { score }) => sum + score, 0)}
                </p>
                <ul
                  className="menu menu-horizontal gap-x-16 text-lg font-normal xl:text-2xl"
                  role="list"
                >
                  {roundThrowLog.map(({ score }, _idx) => (
                    <li key={_idx}>{score}</li>
                  ))}
                </ul>
              </div>
              <Button
                action={() => handleNextPlayerTurn()}
                styles="btn-primary btn mt-auto w-full overflow-hidden rounded-none"
                {...(playerScoreLeft < 181 ||
                roundThrowLog.length === GAME_THROWS_PER_ROUND
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
