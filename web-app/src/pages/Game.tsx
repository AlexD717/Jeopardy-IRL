import "./Game.css"
import { useState } from "react"
import GameBoard from "../components/GameBoard"
import QuestionModal from "../components/QuestionModal"
import type { Category, Question } from "../types"
import { sampleCategories } from "../systems/Data"

const Game = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)

  const handleQuestionClick = (question: Question) => {
    console.log("Press question on host screen", question)
  }

  const closeModal = () => {
    if (activeQuestion) {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          questions: cat.questions.map((q) => (q.id === activeQuestion.id ? { ...q, asked: true } : q)),
        }))
      )
    }
    setActiveQuestion(null)
  }

  return (
    <div className="app-container">
      <GameBoard categories={categories} onQuestionClick={handleQuestionClick} />
      <QuestionModal question={activeQuestion} onClose={closeModal} />
    </div>
  )
}

export default Game
