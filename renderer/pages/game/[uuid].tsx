import { getCurrentGame } from "hooks/getCurrentGame";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { GAME_SCORE_ZONES } from "utils/constants";

const GamePage: NextPage = () => {
  const router = useRouter();
  const gameUUID = (router.query?.uuid as string) || undefined;
  const { isLoading, data: game } = getCurrentGame(gameUUID);

  // TODO: Add better handling
  if (!gameUUID) return <>GAME_UUID IS UNDEFINED!</>;
  if (isLoading) return <>Loading...</>;
  return (
    <>
      <Head>
        <title>Game - DartMate</title>
      </Head>
      <div className="flex h-screen w-screen">
        <main className="bg-yellow-505 w-1/2">PLAYERS</main>
        <aside className="flex-1">
          <div className="grid h-full grid-cols-4 items-center">
            {GAME_SCORE_ZONES.map((zone) => (
              <button className="btn-ghost btn h-full w-full rounded-none">
                {zone}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
};

export default GamePage;
