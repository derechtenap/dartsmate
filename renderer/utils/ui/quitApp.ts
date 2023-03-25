import { ipcRenderer } from "electron";

/**
 * Sends a message to the main process to quit the Electron app.
 *
 * @returns {void}
 *
 */

export const quitApp = (): void => {
  ipcRenderer.send("quit-app");
};
