import React from "react"
import type { PlayerProperties } from "../systems/ScoreTracker"

interface Props {
  players: PlayerProperties[]
}

const PlayerScores: React.FC<Props> = ({ players = [] }) => {
  return (
    <div className="player-scores">
      {players.map((player) => (
        <div className="player-score-card">
          <h2 style={{ marginBottom: "0rem" }}>{player.name}</h2>
          <p>Score: {player.score}</p>
        </div>
      ))}
    </div>
  )
}

export default PlayerScores
