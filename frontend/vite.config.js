import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const FRONT_PORT = Number(process.env.FRONTEND_PORT) || 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: FRONT_PORT,
  },
});
