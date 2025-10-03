/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://firebasestorage.googleapis.com')],
  },
}

module.exports = nextConfig
