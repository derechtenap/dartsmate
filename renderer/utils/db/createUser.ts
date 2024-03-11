// createUser.ts

import { openDatabase } from "./openDatabase"; // Assuming you have an openDatabase function

// Function to add a new user to the 'users' object store
export const createUser = (user: {
  color: string;
  name: {
    firstName: string;
    lastName: string;
  };
  username: string;
}) => {
  return new Promise<void>((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction("users", "readwrite");
        const objectStore = transaction.objectStore("users");
        const requestAdd = objectStore.add(user);

        requestAdd.onsuccess = () => {
          console.log("User added successfully!");
          resolve();
        };

        requestAdd.onerror = () => {
          reject("Error adding user");
        };
      })
      .catch((error) => {
        reject(`Error opening database: ${error as string}`);
      });
  });
};
