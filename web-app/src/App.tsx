import { Routes, Route } from "react-router-dom"
import "./App.css"
import { ToastContainer } from "react-toastify"
import { useGameLoop } from "./systems/GameLoop"
import Setup from "./pages/Setup"
import Search from "./pages/Search"
import Countdown from "./pages/Countdown"

function App() {
    useGameLoop()

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Setup />} />
                <Route path="/Dont-Press-the-Button" element={<Setup />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/search" element={<Search />} />
                <Route path="/countdown" element={<Countdown />} />
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default App
