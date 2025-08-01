import { useEffect, useRef } from "react"
import { ESPCommunicator } from "./ESPCommunicator"

export const useGameLoop = () => {
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const loop = (currentTime: number) => {
      // const lastTime = lastTimeRef.current
      // const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
      lastTimeRef.current = currentTime

      ESPCommunicator.update()

      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
  }, [])
}
