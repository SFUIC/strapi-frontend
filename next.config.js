// ./strapi-frontend/next.config.js

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STRAPI_API_URL,
        pathname: "/uploads/**", // Strapi backend uploads path
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_BUCKET_URL,
        pathname: "/**", // S3 bucket path
      },
    ],
  },
};

module.exports = nextConfig;
