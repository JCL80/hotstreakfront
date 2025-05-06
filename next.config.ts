/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // simplest: allow the whole NBA CDN
    domains: ["cdn.nba.com", "lh3.googleusercontent.com", "ui-avatars.com"],

    /*  or, if you prefer the stricter Remote Patterns API:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.nba.com',
        pathname: '/**',        // headshots + logos
      },
    ],
    */
  },
};

module.exports = nextConfig; // use `export default` if your config is ESM
