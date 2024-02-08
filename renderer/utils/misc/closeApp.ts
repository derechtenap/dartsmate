import { ipcRenderer } from "electron";

/**
 *
 * Sends a signal to the ipcRenderer to close the app.
 * Logs an error message if the code fails.
 * @returns {void}
 *
 */
export const closeApp = (): void => {
  try {
    ipcRenderer.send("quit-app");
  } catch (error) {
    console.error(`Failed to close the app! (${error as string})`);
  }
};
