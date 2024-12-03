import Store from "electron-store";
import pkg from "../../package.json";

type AppSettingsStoreType = {
  defaultProfileUUID?: string;
  locale?: string;
};

const lowerCasedProductName = pkg.productName.toLowerCase();
const storePrefix = `store.${lowerCasedProductName}`;

export const appSettingsStore = new Store<AppSettingsStoreType>({
  name: `${storePrefix}.appSettings`,
});
