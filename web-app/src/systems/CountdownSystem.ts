export class CountdownSystem {
    private static instance: CountdownSystem | null = null;
    private countdown: number;

    private constructor() {
        this.countdown = 10;
    }

    public static getInstance(): CountdownSystem {
        if (!CountdownSystem.instance) {
            CountdownSystem.instance = new CountdownSystem();
        }
        return CountdownSystem.instance;
    }

    public update(deltaTime: number): void {
        this.countdown -= deltaTime;
        document.dispatchEvent(new Event("timerUpdate"));
    }

    public getCountdown(): number {
        return this.countdown;
    }

    public onTimerUpdate(callback: () => void): void {
        document.addEventListener("timerUpdate", callback);
    }

    public offTimerUpdate(callback: () => void): void {
        document.removeEventListener("timerUpdate", callback);
    }
}