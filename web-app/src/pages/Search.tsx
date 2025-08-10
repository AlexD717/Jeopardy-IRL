import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ScoreTracker } from "../systems/ScoreTracker"
import type { PlayerProperties } from "../systems/ScoreTracker"
import "./Search.css"
import { ESPCommunicator } from "../systems/ESPCommunicator"
import { PageCommunicator } from "../systems/PageCommunicator"
import { ButtonPress } from "../systems/ButtonPress"

const PlayerCustomizationCard = ({ playerId, name, isPressed }: PlayerProperties & { isPressed: boolean }) => {
  const [customizedName, setName] = useState(name)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setName(newName)
    if (newName.length === 0) return
    if (newName.length > 15) return
    if (
      ScoreTracker.getInstance()
        .getPlayerData()
        .find((player) => player.name === newName.trimEnd())
    ) {
      console.warn("Name already taken, not updating")
      return
    }
    ScoreTracker.getInstance().updatePlayerName(playerId, newName.trimEnd())
  }

  return (
    <div className={`player-customization-card ${isPressed ? "button-pressed" : ""}`}>
      <h2>{name}</h2>
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
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set())
  const timeoutRefs = useState<Map<string, number>>(new Map())[0]

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

  useEffect(() => {
    const buttonPress = ButtonPress.getInstance()
    const updateButton = () => {
      const buttonId = buttonPress.lastButtonPressed
      console.log("BUTTON PRESSED:", buttonId)

      if (buttonId) {
        setPressedButtons((prev) => new Set(prev).add(buttonId))

        const existingTimeout = timeoutRefs.get(buttonId)
        if (existingTimeout) {
          clearTimeout(existingTimeout)
        }

        const timeout = setTimeout(() => {
          setPressedButtons((prev) => {
            const newSet = new Set(prev)
            newSet.delete(buttonId)
            return newSet
          })
          timeoutRefs.delete(buttonId)
        }, 200)

        timeoutRefs.set(buttonId, timeout)
      }
    }

    updateButton()

    buttonPress.onButtonPressed(updateButton)

    return () => {
      buttonPress.offButtonPressed(updateButton)
      timeoutRefs.forEach((timeout) => clearTimeout(timeout))
      timeoutRefs.clear()
    }
  }, [])

  function startGame() {
    ESPCommunicator.getInstance().sendMessage("Game Start")
    PageCommunicator.OpenGamePage()
    navigate("/gamehost")
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
              <PlayerCustomizationCard key={index} playerId={player.playerId} score={player.score} name={player.name} isPressed={pressedButtons.has(player.playerId)} />
            ))}
          </div>
          <button onClick={startGame}>Continue</button>
        </div>
      )}
    </div>
  )
}

export default Search
