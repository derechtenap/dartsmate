export {};

declare global {
  type ProfileFile = {
    name: string;
    uuid: string;
    avatarImage?: string; // Base64 string
    createdAt: number; // Number of milliseconds since January 1, 1970
    updatedAt: number;
    stats: {
      games: number; // Played games
      wins: number;
      avg: number;
      throws: number;
      totalScore: number;
      missedThrows: number;
    };
  };
}
