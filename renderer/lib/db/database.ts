import Localbase from "localbase";
import { APP_NAME } from "utils/constants";

const lowerCasedAppName = APP_NAME.toLowerCase();

export const database = new Localbase(lowerCasedAppName);
