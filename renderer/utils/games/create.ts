import fs from "fs";
import { checkIfProfileFolderExists } from "utils/checkIfFolderExists";
import { FILE_TYPE_EXTENSIONS, GAME_SAVE_DIRECTORY } from "utils/constants";

export const createGame = async (lobbySettings) => {
  try {
    checkIfProfileFolderExists("games");

    fs.writeFileSync(
      `${GAME_SAVE_DIRECTORY}/${
        lobbySettings.uuid + FILE_TYPE_EXTENSIONS.GAME
      }`,
      JSON.stringify(lobbySettings)
    );
  } catch (e) {
    console.error(e);
  }
};
