/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: ".next-build",
  
  // Configure static file serving
  async headers() {
    return [
      {
        source: '/user_data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/app_data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },

  // Rewrites for development - proxy requests to FastAPI backend
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: 'http://localhost:8000/static/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:8000/app_data/uploads/:path*',
      },
    ];
  },

  // No redirects needed
  async redirects() {
    return [];
  },
};

export default nextConfig;