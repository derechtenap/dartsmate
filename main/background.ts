import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import path from "path";
import { userStore } from "./helpers/user-store";
import i18next from "../next-i18next.config.js";

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
      preload: path.join(__dirname, "main/preload.js"),
      // nodeIntegration: true,
    },
  });

  const locale = userStore.get("locale", i18next.i18n.defaultLocale) as string;

  if (isProd) {
    await mainWindow.loadURL(`app://./${locale}/index.html`);
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/${locale}`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("quit-app", () => {
  app.quit();
});
