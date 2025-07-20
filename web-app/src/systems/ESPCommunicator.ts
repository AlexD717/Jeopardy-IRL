import { toast } from "react-toastify"
export class ESPCommunicator {
    private static readonly version = "1"

    private static instance: ESPCommunicator | null = null
    private esp: any | null = null
    private reader: ReadableStreamDefaultReader<string> | null = null
    private buffer: string = ""

    private constructor() {
        this.registerDisconnectListener();
    }

    public static getInstance(): ESPCommunicator {
        ESPCommunicator.instance ??= new ESPCommunicator()
        return ESPCommunicator.instance
    }

    public static async update(): Promise<void> {
        const instance = ESPCommunicator.getInstance()
        if (!instance.esp || !instance.reader) return

        try {
            while (true) {
                const { value, done } = await instance.reader.read()
                if (done || !value) break

                instance.buffer += value

                let lines = instance.buffer.split("\n")
                instance.buffer = lines.pop() || "" // Save the last incomplete line

                for (const line of lines) {
                    const clean = line.trim()
                    if (clean.length > 0) {
                        console.log("ESP Line:", clean)
                        // TODO: Pass this line to a handler / state store if needed
                    }
                }
            }
        } catch (error) {
            console.error("ESP read error in update():", error)
        }
    }

    private registerDisconnectListener(): void {
        if ("serial" in navigator) {
            (navigator as any).serial.addEventListener("disconnect", (event: Event) => {
                if (!this.esp) return
                this.esp = null
                this.reader = null
                this.buffer = ""
                console.log("ESP Disconnected:", event);
                toast.error("ESP Disconnected", {
                    position: "bottom-right",
                    autoClose: 5000,
                    theme: "dark",
                })  
            });
        }
    }

    async readLine(
        reader: ReadableStreamDefaultReader<string>
    ): Promise<string> {
        let line = ""
        while (true) {
            const { value, done } = await reader.read()
            if (done) break
            if (!value) continue

            line += value
            if (line.includes("\n")) {
                return line.trim() // Return the first full line
            }
        }
        return line.trim() // Return what we have, even if incomplete
    }

    async connectToESP(): Promise<void> {
        console.log("Connecting to MASTER ESP...")
        if (!("serial" in navigator)) {
            console.error("Web Serial API not supported.")
            alert(
                "Web Serial API not supported in this browser. Make sure that you are using the latest version of Chrome"
            )
            return
        }

        let connectingDevice = null

        try {
            // Request a port to connect to
            connectingDevice = await (navigator as any).serial.requestPort()
            console.log("Port selected:", connectingDevice)

            // Open a connection
            await connectingDevice.open({ baudRate: 9600 })

            const textDecoder = new TextDecoderStream()
            connectingDevice.readable.pipeTo(textDecoder.writable)
            this.reader = textDecoder.readable.getReader()
            
            const received = await this.readLine(this.reader)
            console.log("Received:", received)

            if (
                !received.includes(
                    "MasterESP Connected " + ESPCommunicator.version
                )
            ) {
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

        this.esp = connectingDevice
        console.log("Connected to Master ESP")
        toast.success("ESP connected", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
        })
    }
}
