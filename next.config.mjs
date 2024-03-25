/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            // pathname: '/photo-1542909168-82c3e7fdca5c'
          }
        ],
      },
};

export default nextConfig;
