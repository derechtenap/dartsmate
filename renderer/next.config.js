/**
 *
 * @type {import('next').NextConfig}
 *
 */
module.exports = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config) => {
    return config;
  }
};
