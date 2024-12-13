import type { DartThrow } from "types/match";

/**
 * Represents an  missed dart throw, used as a placeholder
 * to fill incomplete rounds or indicate no valid throw occurred.
 */
export const MISSED_THROW: DartThrow = {
  dartboardZone: 0,
  isBullseye: false,
  isDouble: false,
  isMissed: true,
  isOuterBull: false,
  isTriple: false,
  score: 0,
};
