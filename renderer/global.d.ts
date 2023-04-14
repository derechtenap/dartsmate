export {};

declare global {
  type LogType = "ERROR" | "INFO" | "WARN";
  type GameStatus = "ABORTED" | "FINISHED" | "STARTED";

  type Round = {
    elapsed_throwing_time: number; // In seconds
    throws: Array<{
      zone: number;
      points: number;
      round_avg: number;
      is_double: boolean;
      is_triple: boolean;
      is_outer_bull: boolean;
      is_bullseye: boolean;
      is_missed: boolean;
    }>;
  };

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
      round_history: Array<Round>;
    };
  };

  type GameFile = {
    score_mode: number;
    legs: number;
    sets: number;
    randomize_player_order: boolean;
    players: Array<
      ProfileFile & {
        current_game: {
          score_left: number;
          avg: number;
          is_throwing: boolean; // Currently unused
          elapsed_throwing_time: number; // Total time in seconds
          round_history: Array<Round>;
        };
      }
    >;
    uuid: string;
    created_at: number;
    app_version: string;
    current_player: string;
    game_log: Array<{
      type: LogType;
      message: string;
      timestamp: number;
    }>;
    game_status: GameStatus;
  };
}
