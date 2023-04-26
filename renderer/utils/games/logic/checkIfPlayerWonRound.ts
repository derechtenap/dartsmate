export const checkIfPlayerWonRound = (
  score: number,
  roundThrowLog: Throw[]
): boolean => {
  if (score === 0) {
    // Check if last throw was double out
    if (roundThrowLog[roundThrowLog.length - 1].is_double) {
      return true;
    }
  }
  return false;
};
