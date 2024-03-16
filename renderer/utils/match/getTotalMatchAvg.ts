import type { MatchRound } from 'types/match'

// TODO: Instead of using the `navigator.language` allow the user to specify a app language

/**
 *
 * Calculate the total average score from a player's match rounds.
 *
 * @param {MatchRound[]} playerRounds - An array of MatchRound objects representing the player's rounds.
 * @returns {string} The total average score formatted as a local string using the navigator language.
 *
 */
export const getTotalMatchAvg = (playerRounds: MatchRound[]): string => {
  if (playerRounds.length === 0) return (0).toLocaleString(navigator.language)
  const averageScore =
    playerRounds.reduce((total, round) => total + round.roundTotal, 0) / playerRounds.length

  return averageScore.toLocaleString(navigator.language)
}
