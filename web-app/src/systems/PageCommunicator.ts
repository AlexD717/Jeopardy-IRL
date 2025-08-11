import type { Category } from "../types"

export class PageCommunicator {
  public static gamePage: WindowProxy | null = null

  public static OpenGamePage(selectedCategoryNames: Category[]) {
    const gameURL = import.meta.env.MODE === "production" ? "/Jeopardy-IRL/game" : "/game"
    PageCommunicator.gamePage = window.open(gameURL, "_blank")

    window.addEventListener("message", (event) => {
      if (event.data?.type === "ready") {
        console.log("Game page is ready, sending full category objects...")
        this.gamePage?.postMessage(
          {
            type: "categories",
            data: selectedCategoryNames,
          },
          window.location.origin
        )
      }
    })
  }
}
