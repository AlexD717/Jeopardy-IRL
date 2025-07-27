import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ScoreTracker } from "../systems/ScoreTracker"
import type { PlayerProperties } from "../systems/ScoreTracker"
import "./Search.css"

const PlayerCustomizationCard = ({ playerId, name }: PlayerProperties) => {
    const [customizedName, setName] = useState(name)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        ScoreTracker.getInstance().updatePlayerName(playerId, event.target.value)
    }

    return (
        <div className="player-customization-card">
            <h2>{customizedName}</h2>
            <div className="horizontal-flex">
                <p style={{ marginRight: "0.5rem" }}>Name:</p>
                <input type="text" value={customizedName} onChange={handleNameChange} />
            </div>
        </div>
    )
}

const Search = () => {
    const navigate = useNavigate()
    const [connectedESP, setConnectedESP] = useState<PlayerProperties[]>([])

    useEffect(() => {
        const tracker = ScoreTracker.getInstance()
        const updateCount = () => {
            setConnectedESP([...tracker.getPlayerData()])
        }

        updateCount()

        tracker.onPlayerAdded(updateCount)

        return () => {
            tracker.offPlayerAdded(updateCount)
        }
    }, [])

    function startGame() {
        navigate("/countdown")
    }

    return (
        <div className="setup-container">
            <h1 style={{ marginBottom: "0.1rem" }}>Setup</h1>
            {connectedESP.length === 0 ? (
                <p>Searching for available ESPs...</p>
            ) : (
                <div>
                    <p>{connectedESP.length} ESP(s) connected</p>
                    <div className="horizontal-flex">
                        {connectedESP.map((player, index) => (
                            <PlayerCustomizationCard
                                key={index}
                                playerId={player.playerId}
                                score={player.score}
                                name={player.name}
                            />
                        ))}
                    </div>
                    <button onClick={startGame}>Continue</button>
                </div>
            )}
        </div>
    )
}

export default Search
