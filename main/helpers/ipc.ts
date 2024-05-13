import { BrowserWindow, app, ipcMain } from "electron";
import { userStore } from "./user-store";
import log from "electron-log";

ipcMain.handle("setLocale", (_event, locale) => {
  userStore.set("locale", locale);
});

ipcMain.handle("setDefaultUser", (_event, defaultUser) => {
  userStore.set("defaultUser", defaultUser);
});

ipcMain.handle("getDefaultUser", () => {
  return userStore.get("defaultUser");
});

ipcMain.handle("deleteDefaultUser", () => {
  return userStore.delete("defaultUser");
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
