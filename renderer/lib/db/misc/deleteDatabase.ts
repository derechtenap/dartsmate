import log from "electron-log/renderer";

import database from "../database";

const deleteDatabase = () => {
  database
    .delete({
      // Delete database and recreate it whenever the db instance is accessed again
      disableAutoOpen: false,
    })
    .then(() => {
      log.info("Database successfully deleted.");
    })
    .catch((err) => {
      log.error("Could not delete database", err);
    });
};

export default deleteDatabase;
