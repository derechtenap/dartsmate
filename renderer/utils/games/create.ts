import fs from "fs";
import {
  gameDir as dir,
  gameFileExtension as fileExtension,
  checkIfProfileFolderExists,
} from "utils/checkIfFolderExists";

export const createGame = async (lobbySettings) => {
  try {
    checkIfProfileFolderExists("games");

    fs.writeFileSync(
      `${dir}/${lobbySettings.uuid + fileExtension}`,
      JSON.stringify(lobbySettings)
    );
  } catch (e) {
    console.error(e);
  }
};
