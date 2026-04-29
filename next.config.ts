import type { NextConfig } from "next";

const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;
const adminHostname = (() => {
  if (!adminUrl) return null;
  try {
    return new URL(adminUrl).hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprykuhdavbnagzlahqk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      ...(adminHostname
        ? [
            { protocol: "https" as const, hostname: adminHostname, pathname: "/**" },
            { protocol: "http" as const, hostname: adminHostname, pathname: "/**" },
          ]
        : []),
      { protocol: "http", hostname: "localhost", port: "3003", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/**" },
    ],
  },
};

export default nextConfig;
