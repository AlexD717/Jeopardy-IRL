import React from "react"
import type { Question } from "../types"

interface Props {
  question: Question | null
  onCorrect: () => void
  onIncorrect: () => void
}

const QuestionModal: React.FC<Props> = ({ question, onCorrect, onIncorrect }) => {
  if (!question) return null

  return (
    <div className="modal">
      <div className="modal-content-host">
        <h2>${question.value}</h2>
        <p>Question: {question.question}</p>
        <p>Answer: {question.answer}</p>
        <button onClick={onIncorrect}>Incorrect</button>
        <button onClick={onCorrect}>Correct</button>
      </div>
    </div>
  )
}

export default QuestionModal
