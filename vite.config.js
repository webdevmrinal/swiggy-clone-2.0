import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/dapi": "https://www.swiggy.com",
    },
  },
  plugins: [react()],
});
