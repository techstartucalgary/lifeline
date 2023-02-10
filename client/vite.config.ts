import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../build",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      "@tailwind.config": path.resolve(__dirname, "tailwind.config.cjs"),
    },
  },
  optimizeDeps: {
    include: ["@tailwind.config"],
  },
});
