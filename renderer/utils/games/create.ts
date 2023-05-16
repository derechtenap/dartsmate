import fs from "fs";
import { checkIfProfileFolderExists } from "utils/checkIfFolderExists";
import { FILE_TYPE_EXTENSIONS, GAME_SAVE_DIRECTORY } from "utils/constants";

export const createGame = async (lobbySettings: GameFile) => {
  try {
    checkIfProfileFolderExists("games");

    fs.writeFileSync(
      `${GAME_SAVE_DIRECTORY as string}/${
        lobbySettings.uuid + FILE_TYPE_EXTENSIONS.GAME
      }`,
      JSON.stringify(lobbySettings)
    );
  } catch (e) {
    console.error(e);
  }
};
