import React from "react"
import type { Question } from "../types"

interface Props {
  question: Question | null
}

const QuestionModal: React.FC<Props> = ({ question }) => {
  if (!question) return null

  return (
    <div className="modal">
      <div className="modal-content-user">
        <h2>${question.value}</h2>
        <p>{question.question}</p>
      </div>
    </div>
  )
}

export default QuestionModal
