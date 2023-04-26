import { readFileSync } from "fs";
import { FILE_TYPE_EXTENSIONS, GAME_SAVE_DIRECTORY } from "utils/constants";

export const loadGame = async (uuid: string) => {
  try {
    const game = readFileSync(
      `${GAME_SAVE_DIRECTORY}/${uuid + FILE_TYPE_EXTENSIONS.GAME}`,
      {
        encoding: "utf-8",
        flag: "r",
      }
    );

    return await JSON.parse(game);
  } catch (err) {
    console.error(err);
  }
};
