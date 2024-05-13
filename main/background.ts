import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import path from "path";
import { userStore } from "./helpers/user-store";
import i18next from "../next-i18next.config.js";
import log from "electron-log";

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
  await app.whenReady();

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
  const locale = userStore.get("locale", preferredLocale) as string;

  const defaultUser = userStore.get("defaultUser", null);

  const port = process.argv[2];
  const profileCreationURL = isProd
    ? `app://./${locale}/profile/create`
    : `http://localhost:${port}/${locale}/profile/create`;

  if (!defaultUser) {
    // Default profile is undefined, load url to create a new profile
    await mainWindow.loadURL(profileCreationURL);
  } else {
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
