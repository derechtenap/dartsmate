import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import path from "path";
import i18next from "../next-i18next.config.js";
import log from "electron-log";
import { appSettingsStore, profilesStore } from "./helpers/stores";
import logSystemInfo from "./helpers/utils/logSystemInfo";

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

const sessionId = new Date().valueOf();

log.transports.file.resolvePathFn = () => {
  return path.join(app.getPath("logs"), `${sessionId}.log`);
};
  log.transports.file.resolvePathFn = () => {

void (async () => {

  await app.whenReady().then(() => {
    logSystemInfo();

    //  Initialize the logger for renderer process
    log.initialize();
  });

  const mainWindow = createWindow("main", {
    height: minWindowSize.height,
    width: minWindowSize.width,
    minHeight: minWindowSize.height,
    minWidth: minWindowSize.width,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  let preferredLocale = i18next.i18n.defaultLocale;

  /*
   * Check if the current app locale is included in the supported locales.
   * This code fallbacks to the i18n `defaultLocale`, if the locale is not
   * included in the i18n locales array.
   */
  if (i18next.i18n.locales.includes(app.getLocale())) {
    log.info(
      `User's preferred locale is ${app.getLocale()}. If the user hasn't set a locale already, this locale will be used.`
    );
    preferredLocale = app.getLocale().toLowerCase();
  } else {
    log.warn(
      `User's preferred locale is not included in the i18n locales config. Falling back to default locale: ${preferredLocale}!`
    );
  }

  // Get stored locale or try to match the client os locale
  const locale = appSettingsStore.get("locale", preferredLocale);
  const defaultProfile = profilesStore.get("defaultProfile");

  const port = process.argv[2];
  const welcomeRoute = isProd
    ? `app://./${locale}/welcome`
    : `http://localhost:${port}/${locale}/welcome`;

  if (!defaultProfile) {
    // Default profile is undefined, load url to create a new profile
    log.info("Default profile is undefined. Redirect user to welcome route.");
    await mainWindow.loadURL(welcomeRoute);
  } else {
    log.info("Found default profile. Direct user to index route.");
    if (isProd) {
      await mainWindow.loadURL(`app://./${locale}/`);
    } else {
      await mainWindow.loadURL(`http://localhost:${port}/${locale}`);
      mainWindow.webContents.openDevTools();
    }
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
