import path from "path";
import type { DartThrow, Player, MatchRound, Match } from "types/match";
import {
  MATCHES_DIR,
  MATCH_FILENAME_EXTENSION,
  THROWS_PER_ROUND,
} from "utils/constants";
import { createFile } from "utils/fs/createFile";
import { getTotalRoundScore } from "./getTotalRoundScore";
import { isPlayerBusted } from "./isPlayerBusted";

export const handleRoundUpdate = (
  currentPlayer: Player,
  roundThrows: DartThrow[],
  matchData: Match,
  roundTimeSeconds: number
) => {
  if (roundThrows.length < THROWS_PER_ROUND) return;

  // Calculate roundTotal and average
  const roundTotal = getTotalRoundScore(
    roundThrows.map((roundThrow) => roundThrow.score)
  );

  const roundAverage = roundTotal / roundThrows.length;

  // Set scoreLeft to initial match score if scoreLeft is -1,
  // which means it's the first player's throw
  let scoreLeft = 0;

  if (currentPlayer.scoreLeft === -1) {
    scoreLeft = matchData.initialScore - roundTotal;
  } else {
    scoreLeft = currentPlayer.scoreLeft - roundTotal;
  }

  // Check for bust
  const isBust = isPlayerBusted(scoreLeft, matchData.matchCheckout);

  // Reset remaining score if the player busted
  if (isBust) {
    scoreLeft = currentPlayer.scoreLeft;
  }

  // Check for win
  let isWinner = false;
  const lastThrow = roundThrows[roundThrows.length - 1];

  if (
    (matchData.matchCheckout === "Single" &&
      !lastThrow.isDouble &&
      !lastThrow.isTriple &&
      scoreLeft === 0) ||
    (matchData.matchCheckout === "Double" &&
      lastThrow.isDouble &&
      scoreLeft === 0) ||
    (matchData.matchCheckout === "Triple" &&
      lastThrow.isTriple &&
      scoreLeft === 0) ||
    (matchData.matchCheckout === "Any" && scoreLeft === 0)
  ) {
    isWinner = true;
  }

  // Wont updated score if the player fails the checkout
  if (scoreLeft === 0 && !isWinner) {
    scoreLeft = currentPlayer.scoreLeft;
  }

  // Create the round data
  const roundData: MatchRound = {
    elapsedTime: roundTimeSeconds,
    isBust: isBust,
    roundAverage: roundAverage,
    roundTotal: roundTotal,
    throwDetails: roundThrows,
  };

  // Clone the current player data and append the new round data
  const updatedRounds = [...currentPlayer.rounds, roundData];

  // Create the updated player data
  const updatedPlayerData: Player = {
    ...currentPlayer,
    scoreLeft: scoreLeft,
    isWinner: isWinner,
    rounds: updatedRounds,
  };

  // Clone the match data and update the player data
  const updatedPlayers = matchData.players.map((player) =>
    player.uuid === updatedPlayerData.uuid ? updatedPlayerData : player
  );

  const updatedMatchData: Match = {
    ...matchData,
    players: updatedPlayers,
    updatedAt: Date.now(),
  };

  // Write the updated match data to the file
  createFile(
    path.join(MATCHES_DIR, matchData.matchUUID + MATCH_FILENAME_EXTENSION),
    JSON.stringify(updatedMatchData)
  );
};
