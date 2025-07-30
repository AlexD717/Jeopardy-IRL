import { useEffect, useState } from "react";
import { CountdownSystem } from "../systems/CountdownSystem";

const Countdown = () => {
    const [timer, setTimer] = useState(0);

    const formatTime = (seconds: number): string => {
        return Math.round(seconds) < 10 ? `${seconds.toFixed(2)}` : seconds.toFixed(1);
    }

    useEffect(() => {
        const countdownSystem = CountdownSystem.getInstance();
        const updateTimer = () => {
            setTimer(countdownSystem.getCountdown());
        };

        updateTimer();

        countdownSystem.onTimerUpdate(updateTimer);

        return () => {
            countdownSystem.offTimerUpdate(updateTimer);
        };
    }, []);

    return (
        <div className="countdown-container">
            <h1>{formatTime(timer)} seconds</h1>
        </div>
    )
}

export default Countdown
