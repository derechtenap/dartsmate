export {};

declare global {
  type LogType = "ERROR" | "INFO" | "WARN";
  type GameStatus = "ABORTED" | "FINISHED" | "STARTED";

  type ProfileFile = {
    name: string;
    uuid: string;
    avatar_image?: string; // Base64 string
    created_at?: number; // Number of milliseconds since January 1, 1970
    updated_at?: number;
    stats?: {
      games: number; // Played games
      wins: number;
      avg: number;
      throws: number;
      total_score: number;
      missed_throws: number;
    };
  };

  type GameFile = {
    score_mode: number;
    legs: number;
    sets: number;
    randomize_player_order: boolean;
    players: Array<
      ProfileFile & {
        scoreLeft: number;
        avg: number;
        isThrowing: boolean;
        elapsedThrowingTime: number; // In seconds
      }
    >;
    uuid: string;
    created_at: number;
    app_version: string;
    current_player: number;
    game_log: Array<{
      type: LogType;
      message: string;
      timestamp: number;
    }>;
    game_status: GameStatus;
  };
}
