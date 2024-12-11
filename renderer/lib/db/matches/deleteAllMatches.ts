import database from "../database";

const deleteAllMatchesFromDatabase = async () => {
  await database.matches.clear();
};

export default deleteAllMatchesFromDatabase;
