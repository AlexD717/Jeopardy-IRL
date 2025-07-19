import { Routes, Route } from "react-router-dom"
import "./App.css"
import Setup from "./pages/Setup"
import Countdown from "./pages/Countdown"
import { ToastContainer } from "react-toastify"
import { useGameLoop } from "./systems/GameLoop"

function App() {
    useGameLoop()

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Setup />} />
                <Route path="/Dont-Press-the-Button" element={<Setup />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/countdown" element={<Countdown />} />
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default App
