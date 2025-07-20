import { ESPCommunicator } from "../systems/ESPCommunicator"
import { useNavigate } from "react-router-dom"

const Setup = () => {
    const navigate = useNavigate()

    async function connectMasterESP() {
        await ESPCommunicator.getInstance().connectToESP()
        navigate("/countdown")
    }

    return (
        <div className="setup-container">
            <h1>Setup</h1>
            <button onClick={connectMasterESP}>Connect MasterESP</button>
        </div>
    )
}

export default Setup
