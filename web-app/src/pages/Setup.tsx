import { ESPCommunicator } from "../systems/ESPCommunicator"
import { useNavigate } from "react-router-dom"

const Setup = () => {
  const navigate = useNavigate()

  async function connectMasterESP() {
    const connected = await ESPCommunicator.getInstance().connectToESP()
    if (connected) {
      navigate("/search")
    }
  }

  return (
    <div className="setup-container">
      <h1>Setup</h1>
      <button onClick={connectMasterESP}>Connect MasterESP</button>
      <button
        onClick={() => {
          open("https://github.com/AlexD717/Jeopardy-IRL/releases/tag/v1.0.0")
        }}
      >
        Demo Video
      </button>
    </div>
  )
}

export default Setup
