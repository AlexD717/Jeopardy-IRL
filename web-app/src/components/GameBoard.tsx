import React from "react"
import type { Category, Question } from "../types"
import QuestionTile from "./QuestionTile"

interface GameBoardProps {
  categories: Category[]
  onQuestionClick: (q: Question) => void
}

const GameBoard: React.FC<GameBoardProps> = ({ categories, onQuestionClick }) => (
  <div className="game-board">
    {categories.map((cat, i) => (
      <div key={i} className="category-column">
        <div className="category-title">{cat.name}</div>
        {cat.questions.map((q) => (
          <QuestionTile key={q.id} question={q} onClick={() => onQuestionClick(q)} />
        ))}
      </div>
    ))}
  </div>
)

export default GameBoard
