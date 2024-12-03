import { BrowserWindow, app, ipcMain } from "electron";
import { appSettingsStore } from "./stores";
import log from "electron-log";

ipcMain.handle("setLocale", (_event, locale) => {
  appSettingsStore.set("locale", locale);
});

ipcMain.handle("setDefaultProfileUUID", (_event, uuid) => {
  appSettingsStore.set("defaultProfileUUID", uuid);
});

ipcMain.on("minimize-app-window", () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();

  if (focusedWindow) {
    focusedWindow.minimize();
  } else {
    log.error("Attempted to minimize app window, but no focused window found.");
  }
});

ipcMain.on("close-app", () => {
  app.quit();
});
