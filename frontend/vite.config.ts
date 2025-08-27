import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Normal dev server: keep watchers modest
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/.cache/**',
      ],
    },
  },
  // Build: split out heavy deps (optional but useful)
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mui-icons': ['@mui/icons-material'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@mui/material",
      "@mui/system",
      "@emotion/react",
      "@emotion/styled",
      // Not including @mui/icons-material here on purpose for tests;
      // dev/build can still optimize it.
    ],
    esbuildOptions: {
      target: "es2020",
    },
  },
});
