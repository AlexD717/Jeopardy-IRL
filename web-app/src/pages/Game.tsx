import "./Game.css"
import React from "react"
import { useState } from "react"
import GameBoard from "../components/GameBoard"
import QuestionModal from "../components/QuestionModal"
import type { Category, Question } from "../types"
import { sampleCategories } from "../systems/Data"
import PlayerScores from "../components/PlayerScores"
import { ScoreTracker } from "../systems/ScoreTracker"

const Game = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)
  const [players, setPlayers] = useState(ScoreTracker.getInstance().getPlayerData())

  React.useEffect(() => {
    window.opener?.postMessage({ type: "ready", data: "" }, window.location.origin)

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      const { type, data } = event.data

      if (type === "openQuestion" && data) {
        setActiveQuestion(data)
        return
      }

      if (type === "closeQuestion" && data) {
        setActiveQuestion(null)
        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            questions: cat.questions.map((q) => (q.id === data.id ? { ...q, asked: true } : q)),
          }))
        )
        return
      }

      if (type === "players" && data) {
        ScoreTracker.getInstance().setPlayerData(data)
        console.log("Received player data:", data)
        setPlayers(data)
        return
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleQuestionClick = (question: Question) => {
    console.log("Press question on host screen", question)
  }

  return (
    <div className="app-container">
      <GameBoard categories={categories} onQuestionClick={handleQuestionClick} />
      <QuestionModal question={activeQuestion} />
      <PlayerScores players={players} />
    </div>
  )
}

export default Game
