/** @type {import('next').NextConfig} */
const nextConfig = {

  
  
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
     
  },
  
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path":false,
        "dns":false,
        "child_process":false,
        "tls": false
      }
    }
    return config
  },
};

module.exports = nextConfig;
