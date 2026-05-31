import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      external: [
        "node:async_hooks",
        "node:fs",
        "node:path",
        "node:stream",
      ],
    },
  },
  ssr: {
    external: [
      "sonner",
      "@tanstack/start-storage-context",
    ],
  },
});
