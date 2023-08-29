const { i18n } = require("../next-i18next.config");

/**
 *
 * @type {import('next').NextConfig}
 *
 */
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
