import { join } from "path";
import { homedir } from "os";
import pkg from "../../package.json";

// Directories where dartmate stores local used profiles and saved match data
export const APP_DIR = join(homedir(), pkg.productName.toLowerCase());
export const PROFILES_DIR = join(APP_DIR, "profiles");
export const MATCHES_DIR = join(APP_DIR, "matches");

// Filename extensions used by Dartmate
export const PROFILE_FILENAME_EXTENSION = ".profile";
export const MATCH_FILENAME_EXTENSION = ".match";

// Date options used on all pages and components
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

// The maximum number of throws allowed per round in the game.
export const THROWS_PER_ROUND = 3;

// An array containing the possible scoring zones on a dartboard.
export const DARTBOARD_ZONES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
  50,
];

// Values to identify the "special" dartboard zones
export const SCORE_BULLSEYE = 50;
export const SCORE_OUTER_BULL = 25;
export const SCORE_MISSED = 0;
