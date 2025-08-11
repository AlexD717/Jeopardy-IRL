import "./Game.css"
import React, { useState } from "react"
import GameBoard from "../components/GameBoard"
import HostQuestionModal from "../components/HostQuestionModal"
import type { Category, Question } from "../types"
import { sampleCategories } from "../systems/Data"
import { PageCommunicator } from "../systems/PageCommunicator"
import PlayerScores from "../components/PlayerScores"
import { ScoreTracker, type PlayerProperties } from "../systems/ScoreTracker"
import { useNavigate, useLocation } from "react-router-dom"

const GameHost = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)
  const [players] = useState<PlayerProperties[]>(ScoreTracker.getInstance().getPlayerData())
  const navigate = useNavigate()
  const location = useLocation()
  const passedCategories = location.state?.categories

  React.useEffect(() => {
    if (passedCategories && passedCategories.length > 0) {
      setCategories(passedCategories)
    }
  }, [passedCategories])

  React.useEffect(() => {
    if (!categories || categories.length === 0) {
      navigate("/categories")
    }
  }, [categories, navigate])

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, data } = event.data

      if (type === "ready") {
        PageCommunicator.gamePage?.postMessage({ type: "players", data: players }, window.location.origin)
        console.log("Sending player data to game page:", players, data)
        return
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleQuestionClick = (question: Question) => {
    setActiveQuestion(question)
    PageCommunicator.gamePage?.postMessage({ type: "openQuestion", data: question }, window.location.origin)
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
    PageCommunicator.gamePage?.postMessage({ type: "closeQuestion", data: activeQuestion }, window.location.origin)
  }

  const handleCorrect = (pressedButton: string) => {
    console.log("Correct answer for question:", activeQuestion)
    ScoreTracker.getInstance().addScore(pressedButton, activeQuestion?.value ?? 0)
    closeModal()
  }

  const handleIncorrect = (pressedButton: string) => {
    console.log("Incorrect answer for question:", activeQuestion)
    ScoreTracker.getInstance().addScore(pressedButton, -(activeQuestion?.value ?? 0))
    closeModal()
  }

  return (
    <div className="app-container">
      <GameBoard categories={categories} onQuestionClick={handleQuestionClick} />
      <HostQuestionModal question={activeQuestion} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />
      <PlayerScores players={players} />
      <p style={{ textAlign: "left", margin: "0.5rem 0.5rem" }}>For Game Host Eyes Only</p>
    </div>
  )
}

export default GameHost
