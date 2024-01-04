import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  Rectangle,
} from "electron";
import Store from "electron-store";
import { isProd, minWindowSize } from "../background";

export default (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store({ name });
  const defaultSize = {
    width: minWindowSize.width,
    height: minWindowSize.height,
  };
  let state = {};

  // eslint-disable-next-line prefer-const
  let win: BrowserWindow;

  const restore = () => store.get(key, defaultSize);

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState: Rectangle, bounds: Rectangle) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState: Rectangle) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore() as Rectangle);

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    ...state,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
    // Keep frame and menu bar for easier debugging in dev mode
    autoHideMenuBar: isProd ? true : false,
    resizable: true,
    movable: true,
    frame: isProd ? false : true,
  };
  win = new BrowserWindow(browserOptions);

  // Remove application menu, when the app runs in production mode
  if (isProd) {
    win.setMenu(null);
    Menu.setApplicationMenu(null);
  }

  win.on("close", saveState);

  return win;
};
