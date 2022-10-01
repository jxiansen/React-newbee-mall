import { defineConfig, resolveBaseUrl } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // 配置路径别名 "@" => "./src" 目录
    },
  },
});
