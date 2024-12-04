import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import path from "path";
import log from "electron-log";
import { appSettingsStore } from "./helpers/stores";
import { getPreferredLocale, logSystemInfo } from "./helpers/utils";

export const isProd: boolean = process.env.NODE_ENV === "production";

export const minWindowSize = {
  height: 768,
  width: 1024,
};

const sessionId = new Date().valueOf();

if (isProd) {
  serve({ directory: "app" });

  log.transports.file.resolvePathFn = () => {
    return path.join(app.getPath("logs"), `${sessionId}.log`);
  };
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

void (async () => {
  await app.whenReady().then(() => {
    logSystemInfo();

    log.initialize(); // Initialize the logger for renderer process
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

  // Retrieve the stored locale from app settings, or use the client's preferred locale
  const preferredLocale = getPreferredLocale();
  const locale = appSettingsStore.get("locale", preferredLocale);
  const defaultProfile = appSettingsStore.get("defaultProfileUUID");

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
      mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  }
})();

app.on("window-all-closed", () => {
  // On macOS, apps typically remain active after closing all windows
  if (process.platform !== "darwin") {
    app.quit();
  }
});
