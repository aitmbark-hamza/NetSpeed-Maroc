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
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router"],
          query: ["@tanstack/react-query"],
          
          // Non-critical routes in separate chunks
          blog: ["./src/routes/blog.tsx", "./src/routes/blog.$slug.tsx"],
          tools: ["./src/routes/tools.tsx", "./src/routes/categories.tsx"],
          utilities: [
            "./src/routes/about.tsx",
            "./src/routes/contact.tsx",
            "./src/routes/disclaimer.tsx",
            "./src/routes/privacy-policy.tsx",
            "./src/routes/terms-of-service.tsx",
          ],
          generators: [
            "./src/routes/qr-generator.tsx",
            "./src/routes/password-generator.tsx",
          ],
        },
      },
    },
  },
  ssr: {
    external: [
      "sonner",
      "@tanstack/start-storage-context",
    ],
  },
});
