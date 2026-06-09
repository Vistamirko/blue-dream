/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/booking',
        destination: '/prenota',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
