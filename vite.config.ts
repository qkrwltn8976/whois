import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/

export default ({ mode }) =>
  defineConfig({
    plugins: [react()],
    define: {
      "process.env": { ...process.env, ...loadEnv(mode, process.cwd()) },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
