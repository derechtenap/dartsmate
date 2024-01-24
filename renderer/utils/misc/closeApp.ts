import { ipcRenderer } from "electron";

/**
 *
 * Sends a signal to the ipcRenderer to close the app.
 * @function
 * @returns {void}
 *
 */
export const closeApp = (): void => {
  ipcRenderer.send("quit-app");
};
