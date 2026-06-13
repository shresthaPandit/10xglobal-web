/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "C:\\Users\\happy\\OneDrive\\Desktop\\10xglobal\\web-white",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
