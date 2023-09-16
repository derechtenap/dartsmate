import { UUID } from "crypto";
import { Profile } from "./profile";

declare type Checkout = "Any" | "Double" | "Single" | "Triple";
declare type GameType = 901 | 701 | 501 | 301;
declare type MatchStatus = "ABORTED" | "FINISHED" | "STARTED" | "UNFINISHED";

declare type Match = {
  createdAt: number;
  profiles: Profile[];
  updatedAt: number;
  uuid: UUID;
  gameType: GameType;
  checkout: Checkout;
  randomizePlayerOrder: boolean;
  disabledStatistics: boolean;
};
