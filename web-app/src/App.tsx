import { Routes, Route } from "react-router-dom"
import "./App.css"
import { ToastContainer } from "react-toastify"
import { useGameLoop } from "./systems/GameLoop"
import Setup from "./pages/Setup"
import Search from "./pages/Search"
import Game from "./pages/Game"
import GameHost from "./pages/GameHost"

function App() {
  useGameLoop()

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/Jeopardy-IRL" element={<Setup />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gamehost" element={<GameHost />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
