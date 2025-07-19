import { toast } from "react-toastify"

export class ESPCommunicator {
    private static readonly version = "1"

    private static instance: ESPCommunicator | null = null
    private esp: any | null = null

    private constructor() {}

    public static getInstance(): ESPCommunicator {
        ESPCommunicator.instance ??= new ESPCommunicator()
        return ESPCommunicator.instance
    }

    public static update(): void {
        // This method can be used to update the ESPCommunicator state
    }

    async readLine(reader: ReadableStreamDefaultReader<string>): Promise<string> {
        let line = "";
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            if (!value) continue;

            line += value;
            if (line.includes("\n")) {
                return line.trim();  // Return the first full line
            }
        }
        return line.trim(); // Return what we have, even if incomplete
    }

    async connectToESP() {
        console.log("Connecting to MASTER ESP...")
        if (!("serial" in navigator)) {
            console.error("Web Serial API not supported.")
            alert(
                "Web Serial API not supported in this browser. Make sure that you are using the latest version of Chrome"
            )
            return
        }

        try {
            // Request a port to connect to
            this.esp = await (navigator as any).serial.requestPort()
            console.log("Port selected:", this.esp)

            // Open a connection
            await this.esp.open({ baudRate: 9600 })

            const textDecoder = new TextDecoderStream()
            this.esp.readable.pipeTo(textDecoder.writable)
            const reader = textDecoder.readable.getReader()

            const received = await this.readLine(reader)
            console.log("Received:", received)

            if (!received.includes("MasterESP Connected " + ESPCommunicator.version)) {
                throw new Error("Device did not identify as Master ESP32")
            }
        } catch (error) {
            console.error("Error connecting to ESP:", error)
            toast.error("Failed to connect to ESP", {
                position: "bottom-right",
                autoClose: 5000,
                theme: "dark",
            })
            this.esp = null
            return
        }

        toast.success("ESP connected", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
        })
    }
}
