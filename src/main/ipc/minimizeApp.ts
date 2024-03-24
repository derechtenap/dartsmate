import { type IpcMain, BrowserWindow, ipcMain } from 'electron'

/**
 * Registers an IPC event listener for minimizing the application.
 * @returns {IpcMain} The IPC main object.
 */
const minimizeAppHandler = (): IpcMain =>
  ipcMain.on('minimize-app', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()

    if (focusedWindow) {
      focusedWindow.minimize()
    }
  })

export default minimizeAppHandler
