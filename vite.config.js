import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative asset paths: the site works on any host (Vercel, GitHub Pages, a sub-folder)
  base: "./",
});
