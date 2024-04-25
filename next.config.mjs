/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    formats: ['image/avif', 'image/webp'],
    loader: "default",
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
