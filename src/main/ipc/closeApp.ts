import { type IpcMain, app, ipcMain } from 'electron'

/**
 * Registers an IPC event listener for closing the application.
 * @returns {IpcMain} The IPC main object.
 */
const closeAppHandler = (): IpcMain =>
  ipcMain.on('close-app', () => {
    // Quit app, except when being on macOS.
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

export default closeAppHandler
