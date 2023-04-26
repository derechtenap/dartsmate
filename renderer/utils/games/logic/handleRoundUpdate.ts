import { createGame as updateGameFile } from "../create";
import { loadGame } from "../load";

export const handleRoundUpdate = async (
  currentPlayer: string,
  elapsedTime: number,
  roundScore: number,
  roundThrowLog: Throw[],
  uuid: string
) => {
  const oldGameFile: GameFile = await loadGame(uuid);
  const currentPlayerIndex = getCurrentPlayerIndex(currentPlayer, oldGameFile);
  const nextPlayer = getNextPlayer(currentPlayerIndex, oldGameFile);

  // Update game file
  const updatedPlayerList = oldGameFile.players.map((player) => {
    if (player.uuid === currentPlayer) {
      const { avg, elapsed_throwing_time, round_history, score_left } =
        player.current_game;

      // Calculate the new reaming score for the player
      const newScore =
        score_left -
        roundThrowLog.reduce((sum, playerThrow) => sum + playerThrow.score, 0);

      // Calculate the total throwing time
      const newThrowingTime = elapsed_throwing_time + elapsedTime;

      // Calculate the avg within this round
      const avgThisRound = score_left - newScore;

      // Calculate the players game avg
      const newAvg = !round_history.length
        ? avgThisRound
        : (avg + avgThisRound) / 2;

      const isBust = newScore <= 1;

      const roundHistory = {
        elapsed_throwing_time: elapsedTime,
        throws: roundThrowLog,
        round_score: roundScore,
        is_bust: isBust,
      };

      const currentGame = {
        score_left: isBust ? score_left : newScore,
        avg: newAvg,
        elapsed_throwing_time: newThrowingTime,
        round_history: [...round_history, roundHistory],
      };

      return {
        ...player,
        current_game: currentGame,
      };
    }

    return player;
  });

  const updatedGameFileData = {
    ...oldGameFile,
    current_player: nextPlayer,
    players: updatedPlayerList,
  };

  // Overwrite the old game file on the os
  await updateGameFile(updatedGameFileData);
};

const getCurrentPlayerIndex = (currentPlayer: string, gameFile: GameFile) => {
  return gameFile.players.findIndex((player) => player.uuid === currentPlayer);
};

const getNextPlayer = (currentPlayerIndex: number, gameFile: GameFile) => {
  const nextPlayerIndex = (currentPlayerIndex + 1) % gameFile.players.length;

  return gameFile.players[nextPlayerIndex].uuid;
};
