export const createGameLogEntry = (
  currentGameLog: {
    type: LogType;
    message: string;
    timestamp: number;
  }[],
  LogType: LogType,
  message: string
) => {
  return currentGameLog.concat({
    type: LogType,
    message: message,
    timestamp: Date.now(),
  });
};
