import { useQuery } from "@tanstack/react-query";
import { loadGame } from "utils/games/load";

const loadCurrentGame = async (gameUUID: string) => {
  const getGame = await loadGame(gameUUID);

  return getGame;
};

export const getCurrentGame = (gameUUID: string) => {
  return useQuery({
    queryKey: ["currentGame"],
    queryFn: () => loadCurrentGame(gameUUID),
    select: (data) => data as GameFile,
  });
};
