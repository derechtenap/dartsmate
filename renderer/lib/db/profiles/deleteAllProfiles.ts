import database from "../database";

const deleteAllProfilesFromDatabase = async () => {
  await database.profiles.clear();
};

export default deleteAllProfilesFromDatabase;
