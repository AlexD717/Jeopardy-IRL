import { useEffect, useRef } from "react"
import { ESPCommunicator } from "./ESPCommunicator"
import { CountdownSystem } from "./CountdownSystem"

export const useGameLoop = () => {
    const lastTimeRef = useRef(performance.now())

    useEffect(() => {
        const loop = (currentTime: number) => {
            const lastTime = lastTimeRef.current
            const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
            lastTimeRef.current = currentTime

            ESPCommunicator.update()
            CountdownSystem.getInstance().update(deltaTime)

            requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
    }, [])
}
