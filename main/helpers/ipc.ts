import { BrowserWindow, app, ipcMain } from "electron";
import { appSettingsStore, profilesStore } from "./stores";
import log from "electron-log";

ipcMain.handle("setLocale", (_event, locale) => {
  appSettingsStore.set("locale", locale);
});

ipcMain.handle("setDefaultProfile", (_event, defaultProfile) => {
  profilesStore.set("defaultProfile", defaultProfile);
});

ipcMain.handle("getDefaultProfile", () => {
  return profilesStore.get("defaultProfile");
});

ipcMain.handle("setGuestProfile", (_event, profile) => {
  const profiles = profilesStore.get("guestProfiles");
  const newProfiles = [...(profiles || []), profile];
  profilesStore.set("guestProfiles", newProfiles);
});

ipcMain.handle("getGuestProfiles", () => {
  return profilesStore.get("guestProfiles");
});

ipcMain.handle("deleteDefaultProfile", () => {
  return profilesStore.delete("defaultProfile");
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
