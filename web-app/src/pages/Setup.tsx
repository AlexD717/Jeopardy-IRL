import { ESPCommunicator } from "../systems/ESPCommunicator"

const Setup = () => {
    async function connectMasterESP() {
        ESPCommunicator.getInstance().connectToESP()
    }

    return (
        <div className="setup-container">
            <h1>Setup</h1>
            <button onClick={connectMasterESP}>Connect MasterESP</button>
        </div>
    )
}

export default Setup
