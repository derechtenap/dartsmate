import os from "os";
import path from "path";

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
export const GAME_SCORE_MODES = [501, 301, 201];
