import os from "os";
import path from "path";
import pkg from "../../package.json";

export const APP_VERSION = pkg.version;
export const APP_NAME = pkg.productName;

// TODO: Verify if this works on macOS and Linux
export const APP_DIRECTORY = path.join(os.homedir(), "dartmate");
export const PROFILE_SAVE_DIRECTORY = path.join(APP_DIRECTORY, "profiles");
export const GAME_SAVE_DIRECTORY = path.join(APP_DIRECTORY, "games");

export const FILE_TYPE_EXTENSIONS = {
  GAME: ".game",
  PROFILE: ".profile",
  SETTINGS: ".settings",
};

// The maximum amount of players a lobby and game can have
export const GAME_MAX_PLAYERS = 8;
export const GAME_MAX_LEGS = 99;
export const GAME_MAX_SETS = 99;
export const GAME_SCORE_MODES = [701, 501, 301, 201];
export const GAME_THROWS_PER_ROUND = 3;

export const GAME_SCORE_ZONES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50,
  0,
];
