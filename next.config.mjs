/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
  },
};

export default nextConfig;
