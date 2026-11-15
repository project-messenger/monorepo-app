import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace-пакет отдаёт исходники на TypeScript — Next должен их транспилировать.
  transpilePackages: ["@app/shared"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
