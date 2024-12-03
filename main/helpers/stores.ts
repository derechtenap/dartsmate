import Store from "electron-store";
import pkg from "../../package.json";

const lowerCasedProductName = pkg.productName.toLowerCase();
const storePrefix = `store.${lowerCasedProductName}`;

export const appSettingsStore = new Store<{
  locale?: string;
  defaultProfileUUID?: string;
}>({
  name: `${storePrefix}.appSettings`,
});
