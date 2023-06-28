/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.computerunivers.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.computeruniverse.net',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
