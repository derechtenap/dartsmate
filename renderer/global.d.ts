export {};

declare global {
  type Match = {
    matchUUID: string;
    players: PlayerList;
    settings: Settings;
  };

  type Player = {
    avg: number;
    name: string;
    scoreLeft: number;
    throwHistory: {}[];
    throws: number;
    totalScore: number;
    uuid: string;
  };

  type PlayerList = Player[];

  type Settings = {
    legs: number;
    players: number;
    score: number;
    sets: number;
  };
}
