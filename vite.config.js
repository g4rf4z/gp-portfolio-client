import { defineConfig, loadEnv } from "vite";

import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "#": path.resolve(__dirname, "./src/components"),
      },
    },
    plugins: [vue({ reactivityTransform: true })],
    server: {
      port: parseInt(env.VITE_PORT) || 3333,
    },
  };
});
