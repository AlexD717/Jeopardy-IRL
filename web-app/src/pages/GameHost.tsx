import "./Game.css"
import { useState } from "react"
import GameBoard from "../components/GameBoard"
import HostQuestionModal from "../components/HostQuestionModal"
import type { Category, Question } from "../types"
import { sampleCategories } from "../systems/Data"
import { PageCommunicator } from "../systems/PageCommunicator"

const GameHost = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)

  const handleQuestionClick = (question: Question) => {
    setActiveQuestion(question)
    PageCommunicator.gameHostPage?.postMessage({ type: "openQuestion", question: question }, window.location.origin)
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
    PageCommunicator.gameHostPage?.postMessage({ type: "closeQuestion", question: activeQuestion }, window.location.origin)
  }

  const handleCorrect = () => {
    console.log("Correct answer for question:", activeQuestion)
    closeModal()
  }

  const handleIncorrect = () => {
    console.log("Incorrect answer for question:", activeQuestion)
    closeModal()
  }

  return (
    <div className="app-container">
      <GameBoard categories={categories} onQuestionClick={handleQuestionClick} />
      <HostQuestionModal question={activeQuestion} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />
    </div>
  )
}

export default GameHost
