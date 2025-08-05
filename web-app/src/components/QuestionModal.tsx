import React from "react"
import type { Question } from "../types"

interface Props {
  question: Question | null
  onClose: () => void
}

const QuestionModal: React.FC<Props> = ({ question, onClose }) => {
  if (!question) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>${question.value}</h2>
        <p>{question.question}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default QuestionModal
