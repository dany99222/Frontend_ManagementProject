import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mejora las rutas, simpre con el @ apunta a src 
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
