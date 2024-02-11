import type { IpcRendererEvent } from "electron";
import { contextBridge, ipcRenderer } from "electron";

interface IpcHandler {
  send(channel: string, value: string): void;
  on(channel: string, callback: (...args: string[]) => void): () => void;
  setLocale(locale: string): void;
}

const handler: IpcHandler = {
  send(channel, value) {
    ipcRenderer.send(channel, value);
  },
  on(channel, callback) {
    const subscription = (_event: IpcRendererEvent, ...args: string[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  setLocale(locale) {
    void ipcRenderer.invoke(`setLocale`, locale);
  },
};

contextBridge.exposeInMainWorld("ipc", handler);
