export {};

declare global {
  type ProfileFile = {
    name: string;
    uuid: string;
    avatar_image?: string | FileList; // Base64 string
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
}
