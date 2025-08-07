import "./Game.css"
import React from "react"
import { useState } from "react"
import GameBoard from "../components/GameBoard"
import QuestionModal from "../components/QuestionModal"
import type { Category, Question } from "../types"
import { sampleCategories } from "../systems/Data"
import PlayerScores from "../components/PlayerScores"

const Game = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      const { type, question } = event.data

      if (type === "openQuestion" && question) {
        setActiveQuestion(question)
        return
      }

      if (type === "closeQuestion" && question) {
        setActiveQuestion(null)
        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            questions: cat.questions.map((q) => (q.id === question.id ? { ...q, asked: true } : q)),
          }))
        )
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
      <PlayerScores />
    </div>
  )
}

export default Game
