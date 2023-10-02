import type { UUID } from "crypto";
import type { Profile } from "./profile";

interface Player extends Profile {
  scoreLeft: number;
  isWinner: boolean;
  rounds: MatchRound[];
}

declare type Checkout = "Any" | "Double" | "Single" | "Triple";
declare type MatchStatus = "aborted" | "finished" | "started";

declare type Match = {
  appVersion: string;
  createdAt: number;
  initialScore: number;
  players: Player[];
  matchCheckout: Checkout;
  matchStatus: MatchStatus;
  matchUUID: UUID;
  updatedAt: number;
};

declare type MatchRound = {
  elapsedTime: number;
  isBust: boolean;
  roundAverage: number;
  roundTotal: number;
  throwDetails: DartThrow[];
};

declare type DartboardZone = "BULLSEYE" | "NUMBER" | "MISSED" | "OUTER_BULL";

declare type DartThrow = {
  isBullseye: boolean;
  isDouble: boolean;
  isMissed: boolean;
  isOuterBull: boolean;
  isTriple: boolean;
  score: number;
  dartboardZone: number; // The specific zone on the dartboard where the throw landed
};
