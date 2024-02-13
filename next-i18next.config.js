/** 
 * 
 * @type {import('next-i18next').UserConfig} 
 * 
 */
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: [
            "de",
            "en",
        ],
    },
    debug: process.env.NODE_ENV === "development",
    reloadOnPrerender: process.env.NODE_ENV === "development",
    localePath:
        typeof window === "undefined"
            ? require("path").resolve("./renderer/public/locales")
            : "/locales",
}
