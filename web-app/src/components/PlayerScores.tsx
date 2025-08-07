import React from "react"
import type { PlayerProperties } from "../systems/ScoreTracker"
import { ScoreTracker } from "../systems/ScoreTracker"

const PlayerScores: React.FC = () => {
  const [players, setPlayers] = React.useState<PlayerProperties[]>([])
  React.useEffect(() => {
    const scoreTracker = ScoreTracker.getInstance();
    setPlayers(scoreTracker.getPlayerData());
    const updatePlayers = () => setPlayers(scoreTracker.getPlayerData());
    scoreTracker.onPlayerAdded(updatePlayers);
    return () => {
      scoreTracker.offPlayerAdded(updatePlayers);
    };
    console.log("Player scores updated:", players);
  }, []);

  return (
    <div className="player-scores">
      <ul>
        {players.map((player) => (
          <div className="player-score-card">
            <h2>{player.name}</h2>
            <p>Score: {player.score}</p>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default PlayerScores
