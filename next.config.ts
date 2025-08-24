/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  output: 'export',
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [new URL("https://fedskillstest.ct.digital")],
  },
  assetPrefix: "./",
};

export default nextConfig;