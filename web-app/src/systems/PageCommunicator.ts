import { ScoreTracker } from "./ScoreTracker"

export class PageCommunicator {
  public static gamePage: WindowProxy | null = null

  public static OpenGamePage() {
    const gameURL = import.meta.env.MODE === "production" ? "./game" : "/game"
    PageCommunicator.gamePage = window.open(gameURL, "_blank")

    window.addEventListener("message", (event) => {
      if (event.data?.type === "ready") {
        console.log("Game page is ready, sending data...")
        this.gamePage?.postMessage(ScoreTracker.getInstance().getPlayerData(), window.location.origin)
      }
    })
  }
}
