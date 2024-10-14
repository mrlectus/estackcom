/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "8w7jxacwou7sdvtx.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
