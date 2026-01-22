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
    ],
  },
};

module.exports = nextConfig;
