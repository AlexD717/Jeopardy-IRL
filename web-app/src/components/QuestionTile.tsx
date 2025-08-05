import React from "react"
import type { Question } from "../types"

interface Props {
  question: Question
  onClick: () => void
}

const QuestionTile: React.FC<Props> = ({ question, onClick }) => {
  return (
    <div className={`question-tile ${question.asked ? "disabled" : ""}`} onClick={!question.asked ? onClick : undefined}>
      {!question.asked ? `$${question.value}` : ""}
    </div>
  )
}

export default QuestionTile
