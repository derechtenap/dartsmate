import Store from "electron-store";
import pkg from "../../package.json";
import type { Profile } from "../../renderer/types/profile";

type ProfileStoreType = {
  defaultProfile?: Profile;
  guestProfiles?: Profile[];
};

const lowerCasedProductName = pkg.productName.toLowerCase();
const storePrefix = `store.${lowerCasedProductName}`;

export const profilesStore = new Store<ProfileStoreType>({
  name: `${storePrefix}.profiles`,
});

export const defaultProfileStore = new Store<Profile>({
  name: `${storePrefix}.defaultProfile`,
});

export const matchHistoryStore = new Store({
  name: `${storePrefix}.matchHistory`,
});

export const appSettingsStore = new Store<{ locale?: string }>({
  name: `${storePrefix}.appSettings`,
});
