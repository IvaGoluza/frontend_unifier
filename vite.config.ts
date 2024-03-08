import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), { ...eslint({ include: "src/**/*.+(js|jsx|ts|tsx)" }), enforce: "pre" }],
  server: {
    proxy: {
      "api/": "http://localhost:8080",
    },
  },
});
