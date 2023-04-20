import { loadGame } from "../load";
import { createGame } from "../create";
import { createGameLogEntry } from "utils/misc/createGameLogEntry";

export const handleAbortCurrentGame = async (gameUUID: string) => {
  const file: GameFile = await loadGame(gameUUID);

  // Add game log entry
  const updatedFile = {
    ...file,
    game_status: "ABORTED",
    game_log: createGameLogEntry(file.game_log, "INFO", "Game Aborted By User"),
  };

  // Update file
  await createGame(updatedFile);
};
