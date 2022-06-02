/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "dns":false,
        "child_process":false,
        "tls": false
      }
    }
    return config
  },
};

module.exports = nextConfig;
