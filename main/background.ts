import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import i18next from "../next-i18next.config";
import { userStore } from "./helpers/user-store";

export const isProd: boolean = process.env.NODE_ENV === "production";

export const minWindowSize = {
  height: 768,
  width: 1024,
};

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

void (async () => {
  await app.whenReady().then(() => {
    log.initialize();
    log.transports.file.level = "debug";
    autoUpdater.logger = log;
    autoUpdater.allowPrerelease = true; // TODO: Remove if first stable release is available

    autoUpdater
      .checkForUpdatesAndNotify()
      .then(() => {
        log.info("checked for updates");
      })
      .catch(() => {
        log.error("Something went wrong while updating...");
      });
  });

  const mainWindow = createWindow("main", {
    height: minWindowSize.height,
    width: minWindowSize.width,
    minHeight: minWindowSize.height,
    minWidth: minWindowSize.width,
    /*
     * Disable the ability to maximize the window with a double tap.
     * Users can still maximize the window using the Mantine
     * `useFullscreen` hook.
     */
    maximizable: false,
  });

  const locale = userStore.get("locale", i18next.i18n.defaultLocale) as string;

  if (isProd) {
    await mainWindow.loadURL("app://./${locale}/");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/${locale}/`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("quit-app", () => {
  app.quit();
});
