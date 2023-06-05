const { i18n } = require("../next-i18next.config");

module.exports = {
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) config.target = "electron-renderer";

    return config;
  },
  i18n,
};
