import Localbase from "localbase";
import { APP_NAME } from "utils/constants";

const lowerCasedAppName = APP_NAME.toLowerCase();

const database = new Localbase(lowerCasedAppName);

export default database;
