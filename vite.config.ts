import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { join, resolve } from "node:path";
import { defineConfig } from "vite";

const BASE_URL = process.env.BASE_URL || "";
const workingDir = resolve(import.meta.dirname);

// https://vite.dev/config/
export default defineConfig({
  base: `${BASE_URL}/`,
  plugins: [react(), tailwindcss()],
  root: "./packages/client",
  build: {
    outDir: join(workingDir, "dist"),
  },
});
