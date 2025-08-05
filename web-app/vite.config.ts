import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/Jeopardy-IRL/" : "/",
  server: {
    port: 3000,
    open: true,
  },
}))
