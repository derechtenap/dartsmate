import { openDatabase } from "./openDatabase";

// Function to get all students from the 'students' object store
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction("users", "readonly");
        const objectStore = transaction.objectStore("users");
        const request = objectStore.getAll();

        request.onsuccess = () => {
          const students = request.result;
          resolve(students);
        };

        request.onerror = () => {
          reject("Error fetching users!");
        };
      })
      .catch((error) => {
        reject(`Error opening database: ${error as string}`);
      });
  });
};
