import { UseListStateHandlers } from "@mantine/hooks";
import type { Throw } from "types/match";
import {
  SCORE_BULLSEYE,
  SCORE_MISSED,
  SCORE_OUTER_BULL,
} from "utils/constants";

/**
 *
 * Handles adding a score to the throw list with optional multipliers.
 *
 * @param {number} score - The score to add.
 * @param {boolean} isDouble - Whether the double multiplier is applied.
 * @param {boolean} isTriple - Whether the triple multiplier is applied.
 * @param {function} isDoubleToggle - Function to toggle the double multiplier.
 * @param {function} isTripleToggle - Function to toggle the triple multiplier.
 * @param {UseListStateHandlers<Throw>} throwList - The list of throws to which the score will be added.
 *
 * @returns {void}
 *
 */
export const handleAddScore = (
  score: number,
  isDouble: boolean,
  isTriple: boolean,
  isDoubleToggle: (value: boolean) => void,
  isTripleToggle: (value: boolean) => void,
  throwList: UseListStateHandlers<Throw>
): void => {
  let multipliedScore = score;

  // If the player hits the outer bull or bullseye, the score remains
  // unchanged, regardless of the previously or accidentally selected
  // multipliers
  if (score !== SCORE_BULLSEYE && score !== SCORE_OUTER_BULL) {
    if (isDouble) {
      multipliedScore = score * 2;
    }

    if (isTriple) {
      multipliedScore = score * 3;
    }
  }

  // Reset multipliers for the next player input
  isDoubleToggle(false);
  isTripleToggle(false);

  throwList.append({
    isBullseye: score === SCORE_BULLSEYE,
    isOuterBull: score === SCORE_OUTER_BULL,
    isDouble: isDouble,
    isTriple: isTriple,
    isMissed: score === SCORE_MISSED,
    score: multipliedScore,
    zone: score, // Unchanged score equals the zone on the dartboard
  });
};
