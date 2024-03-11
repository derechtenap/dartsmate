import { DATABASE_VERSION } from "utils/constants";

export const openDatabase = (): Promise<IDBDatabase> => {
  const dbRequest = indexedDB.open("dartsmate", DATABASE_VERSION);

  // Check for new database version or if the db is newly created...
  dbRequest.onupgradeneeded = () => {
    const db = dbRequest.result;

    // Check if the database contains the required tables
    if (!db.objectStoreNames.contains("users")) {
      db.createObjectStore("users", {
        keyPath: "id",
        autoIncrement: true,
      });
    }

    if (!db.objectStoreNames.contains("matches")) {
      db.createObjectStore("matches", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  };

  return new Promise((resolve, reject) => {
    dbRequest.onsuccess = () => {
      resolve(dbRequest.result);
    };

    dbRequest.onerror = (e) => {
      reject(e);
    };
  });
};
