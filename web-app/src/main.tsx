import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"

const base =
    import.meta.env.MODE === "production" ? "/Dont-Press-the-Button/" : "/"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter basename={base}>
            <App />
        </BrowserRouter>
    </StrictMode>
)
