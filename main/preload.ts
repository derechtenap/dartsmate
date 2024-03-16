import type { IpcRendererEvent } from 'electron'
import { contextBridge, ipcRenderer } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
  setLocale(locale: string) {
    void ipcRenderer.invoke(`setLocale`, locale)
  }
}

contextBridge.exposeInMainWorld('ipc', handler)
export type IpcHandler = typeof handler
