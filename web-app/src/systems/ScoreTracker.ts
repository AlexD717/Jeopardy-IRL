export interface PlayerProperties {
  playerId: string
  score: number
  name: string
}

export class ScoreTracker {
  private static instance: ScoreTracker | null = null
  private players: PlayerProperties[]
  private eventTarget: EventTarget

  private constructor() {
    this.players = []
    this.eventTarget = new EventTarget()
  }

  public static getInstance(): ScoreTracker {
    if (!ScoreTracker.instance) {
      ScoreTracker.instance = new ScoreTracker()
    }
    return ScoreTracker.instance
  }

  public addPlayer(playerId: string): void {
    if (!this.players.find((player) => player.playerId === playerId.trim())) {
      this.players.push({ playerId: playerId.trim(), score: 0, name: `Player ${this.players.length + 1}` })
      this.eventTarget.dispatchEvent(new Event("playerAdded"))
      console.log("Player added:", playerId)
      console.log("Current players:", this.players)
    }
  }

  public onPlayerAdded(callback: () => void): void {
    this.eventTarget.addEventListener("playerAdded", callback)
  }

  public offPlayerAdded(callback: () => void): void {
    this.eventTarget.removeEventListener("playerAdded", callback)
  }

  public updatePlayerName(playerId: string, name: string): void {
    const player = this.players.find((player) => player.playerId === playerId)
    if (player) {
      player.name = name
    }
    this.eventTarget.dispatchEvent(new Event("playerAdded"))
  }

  public getPlayerData(): PlayerProperties[] {
    return this.players
  }

  public addScore(playerId: string, score: number): void {
    const player = this.players.find((player) => player.playerId === playerId)
    if (player) {
      player.score += score
    }
  }

  public getScore(playerId: string): number {
    const player = this.players.find((player) => player.playerId === playerId)
    return player ? player.score : 0
  }

  public resetScores(): void {
    this.players = []
  }
}
