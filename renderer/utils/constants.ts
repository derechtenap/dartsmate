import { join } from "path";
import { homedir } from "os";
import pkg from "../../package.json";

// Directories where dartmate stores local used profiles and saved match data
export const APP_DIR = join(homedir(), pkg.productName.toLowerCase());
export const PROFILES_DIR = join(APP_DIR, "profiles");
export const MATCHES_DIR = join(APP_DIR, "matches");

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};
