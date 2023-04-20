import { GAME_THROWS_PER_ROUND } from "utils/constants";

export const handlePlayerThrow = (
  dartboardPointsZone: number,
  currentThrowLog: Throw[],
  isDouble: boolean,
  isTriple: boolean
) => {
  // Abort the function if the player already have the maximum
  // amount of throws in this round
  if (currentThrowLog.length >= GAME_THROWS_PER_ROUND) return;

  // Create a new throw object for the save game
  let newThrow = createNewThrow(dartboardPointsZone, isDouble, isTriple);

  // Update throw log for the save game
  const updatedThrowLog = [...currentThrowLog, newThrow];

  // Calculate the total round score
  const totalScore = updatedThrowLog.reduce(
    (sum, newThrow) => sum + newThrow.score,
    0
  );

  // Calculate round average
  newThrow.round_avg = totalScore / updatedThrowLog.length;

  return { newThrow, updatedThrowLog };
};

const createNewThrow = (zone: number, isDouble: boolean, isTriple: boolean) => {
  let newThrow: Throw = {
    zone: zone,
    score: zone,
    round_avg: 0,
    is_double: false,
    is_triple: false,
    is_outer_bull: false,
    is_bullseye: false,
    is_missed: false,
  };

  switch (newThrow.zone) {
    case 0:
      newThrow.is_missed = true;
      break;
    case 25:
      newThrow.is_outer_bull = true;
      break;
    case 50:
      newThrow.is_bullseye = true;
      break;
    default:
      if (isDouble) {
        newThrow.is_double = true;
        newThrow.score = zone * 2;
      }
      if (isTriple) {
        newThrow.is_triple = true;
        newThrow.score = zone * 3;
      }
      break;
  }

  return newThrow;
};
