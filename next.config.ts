import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Native module support (better-sqlite3 for local dev) ──────────────
  serverExternalPackages: ["better-sqlite3", "@prisma/adapter-better-sqlite3"],

  // ── Image optimization ─────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // ── Turbopack (Next.js 16 default) ────────────────────────────────────
  turbopack: {},

  // ── Webpack: exclude native modules from server bundle ────────────────
  webpack(config, { isServer }) {
    if (isServer) {
      // Don't bundle native addons — let Node.js require them directly
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : [config.externals].filter(Boolean)),
        "better-sqlite3",
        "@prisma/adapter-better-sqlite3",
      ];
    }
    return config;
  },
};

export default nextConfig;
