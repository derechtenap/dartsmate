import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { updateElectronApp } from "update-electron-app";

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
  });

  if (isProd) {
    await mainWindow.loadURL("app://./index.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }
})();

// No need to wait for your app's ready event...
updateElectronApp({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  logger: require("electron-log"),
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("quit-app", () => {
  app.quit();
});
