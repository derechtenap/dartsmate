import type { IpcRendererEvent } from "electron";
import { contextBridge, ipcRenderer } from "electron";
import { Profile } from "../renderer/types/profile";
import log from "electron-log/main";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  setLocale(locale: string) {
    void ipcRenderer.invoke(`setLocale`, locale);
  },

  setDefaultProfile(defaultProfile: Profile) {
    void ipcRenderer.invoke("setDefaultProfile", defaultProfile);
  },

  deleteDefaultProfile() {
    void ipcRenderer.invoke("deleteDefaultProfile");
  },

  getDefaultProfile() {
    return ipcRenderer.invoke("getDefaultProfile");
  },

  setGuestProfile(profile: Profile) {
    void ipcRenderer.invoke("setGuestProfile", profile);
  },

  deleteGuestProfile(profile: Profile) {
    log.info("Deleting Profile", profile);
    // TODO: Add return
    // void ipcRenderer.invoke("setGuestProfile", profile)
  },

  deleteAllGuestProfiles() {
    log.info("Deleting all Guest Profiles");
  },

  getGuestProfiles() {
    return ipcRenderer.invoke("getGuestProfiles");
  },
};

contextBridge.exposeInMainWorld("ipc", handler);
export type IpcHandler = typeof handler;
