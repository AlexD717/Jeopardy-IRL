import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: mode === "production" ? "/Dont-Press-the-Button/" : "/",
    server: {
        port: 3000,
        open: true,
    },
}))
