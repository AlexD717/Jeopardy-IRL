import { useNavigate } from "react-router-dom"

const Search = () => {
    const navigate = useNavigate()

    function startGame() {
        navigate("/countdown")
    }

    return (
        <div className="setup-container">
            <h1>Setup</h1>
            <p>Searching for available ESPs...</p>
            <button onClick={startGame}>Continue</button>
        </div>
    )
}

export default Search
