/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This allows images from Cloudinary to show up in your app
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.auth0.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        pathname: "/**",
      }
    ],
  },
};

module.exports = nextConfig;
