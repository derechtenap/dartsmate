import type { Player } from "types/match";

export const randomizePlayerList = (
  playerList: Player[],
  shouldBeRandomized: boolean
): Player[] => {
  // Return the provided player list when the user
  // set `Randomize Player List` is set to `false` inside
  // the lobby page
  if (!shouldBeRandomized) return playerList;

  return playerList;
};
