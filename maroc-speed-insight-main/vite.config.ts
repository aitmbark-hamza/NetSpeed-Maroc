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
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules/react') && !id.includes('node_modules/react-router')) return 'vendor-react';
          if (id.includes('@tanstack/react-router')) return 'vendor-router';
          if (id.includes('@tanstack/react-query')) return 'vendor-query';
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (id.includes('framer-motion')) return 'vendor-animation';
          
          // Route chunks - split each tool into separate chunk
          if (id.includes('ip-checker')) return 'route-ip-checker';
          if (id.includes('speed-test')) return 'route-speed-test';
          if (id.includes('dns-lookup')) return 'route-dns-lookup';
          if (id.includes('ping-test')) return 'route-ping-test';
          if (id.includes('qr-generator')) return 'route-qr-generator';
          if (id.includes('password-generator')) return 'route-password-generator';
          if (id.includes('blog.tsx') || id.includes('blog.$slug')) return 'route-blog';
          if (id.includes('about.tsx')) return 'route-about';
          if (id.includes('contact.tsx')) return 'route-contact';
          if (id.includes('tools.tsx') || id.includes('categories')) return 'route-tools';
          
          // Keep homepage + critical path in main
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
