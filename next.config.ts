import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        domains: ["i.pravatar.cc"],
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "picsum.photos" },
        ],
    },
    experimental: { typedRoutes: true },
};
export default nextConfig;