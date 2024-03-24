import pkg from '../../../../package.json'

export const APP_NAME = pkg.productName
export const APP_VERSION = pkg.version

// Filename extensions used by Dartsmate
export const PROFILE_FILENAME_EXTENSION = '.profile'
export const MATCH_FILENAME_EXTENSION = '.match'

// Date options used on all pages and components
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

// The maximum number of throws allowed per round in the game.
export const THROWS_PER_ROUND = 3

// An array containing the possible scoring zones on a dartboard.
export const DARTBOARD_ZONES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50
]

// Values to identify the "special" dartboard zones
export const SCORE_BULLSEYE = 50
export const SCORE_OUTER_BULL = 25
export const SCORE_MISSED = 0
