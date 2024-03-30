/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            // pathname: '/photo-1542909168-82c3e7fdca5c'
          },
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
            // pathname: '/photo-1542909168-82c3e7fdca5c'
          }
        ],
      },
};

export default nextConfig;
