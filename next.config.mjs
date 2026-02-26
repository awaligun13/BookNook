/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',      // or 'https' if your images use https
        hostname: 'books.google.com',
        port: '',              // usually empty
        pathname: '/books/**',
      },
    ],
  }
};

export default nextConfig;
