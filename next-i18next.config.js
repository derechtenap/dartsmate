/** @type {import("next-i18next").UserConfig} */

const path = require("path");

const nextI18NextConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    localePath: path.resolve("./renderer/public/locales"),
    localeStructure: "{{lng}}/{{ns}}",
  },
};

module.exports = nextI18NextConfig;
