import { toast } from "react-toastify"
import { ScoreTracker } from "./ScoreTracker"
export class ESPCommunicator {
  private static readonly version = "1"

  private static instance: ESPCommunicator | null = null
  private esp: any | null = null
  private reader: ReadableStreamDefaultReader<string> | null = null
  private writer: WritableStreamDefaultWriter<string> | null = null
  private buffer: string = ""

  private constructor() {
    this.registerDisconnectListener()
  }

  public static getInstance(): ESPCommunicator {
    ESPCommunicator.instance ??= new ESPCommunicator()
    return ESPCommunicator.instance
  }

  private static processESPLine(input: string): void {
    console.log("ESP Line:", input)
    const acknowledge = "Message: Ready "
    if (input.startsWith(acknowledge)) {
      const espAddress = input.substring(acknowledge.length)
      ScoreTracker.getInstance().addPlayer(espAddress)
    }
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
            ESPCommunicator.processESPLine(clean)
          }
        }
      }
    } catch (error) {
      console.error("ESP read error in update():", error)
    }
  }

  private registerDisconnectListener(): void {
    if ("serial" in navigator) {
      ;(navigator as any).serial.addEventListener("disconnect", (event: Event) => {
        if (!this.esp) return
        this.esp = null
        this.reader = null
        this.writer = null
        this.buffer = ""
        console.log("ESP Disconnected:", event)
        toast.error("ESP Disconnected", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "dark",
        })
      })
    }
  }

  async readLine(reader: ReadableStreamDefaultReader<string>): Promise<string> {
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

  async sendMessage(message: string): Promise<void> {
    if (!this.writer) {
      console.error("ESP not connected or writer not initialized.")
      return
    }

    try {
      await this.writer.write(message + "\n")
      console.log("Sent message:", message)
    } catch (error) {
      console.error("Error sending message to ESP:", error)
      toast.error("Failed to send message to ESP", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      })
    }
  }

  async connectToESP(): Promise<boolean> {
    console.log("Connecting to MASTER ESP...")
    if (!("serial" in navigator)) {
      console.error("Web Serial API not supported.")
      alert("Web Serial API not supported in this browser. Make sure that you are using the latest version of Chrome")
      return false
    }

    let connectingDevice = null

    try {
      // Request a port to connect to
      connectingDevice = await (navigator as any).serial.requestPort()
      console.log("Port selected:", connectingDevice)

      // Open a connection
      await connectingDevice.open({ baudRate: 9600 })

      // Setup reader
      const textDecoder = new TextDecoderStream()
      connectingDevice.readable.pipeTo(textDecoder.writable)
      this.reader = textDecoder.readable.getReader()

      // Setup writer
      const textEncoder = new TextEncoderStream()
      this.writer = textEncoder.writable.getWriter()
      textEncoder.readable.pipeTo(connectingDevice.writable)

      const received = await this.readLine(this.reader)
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
      return false
    }

    this.esp = connectingDevice
    console.log("Connected to Master ESP")
    toast.success("ESP connected", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "dark",
    })
    return true
  }
}
