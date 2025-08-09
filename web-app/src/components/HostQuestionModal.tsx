import React from "react"
import { useEffect } from "react"
import type { Question } from "../types"
import { ButtonPress } from "../systems/ButtonPress"
import { ScoreTracker } from "../systems/ScoreTracker"

interface Props {
  question: Question | null
  onCorrect: (pressedButton: string) => void
  onIncorrect: (pressedButton: string) => void
}

const QuestionModal: React.FC<Props> = ({ question, onCorrect, onIncorrect }) => {
  const [pressedButton, setPressedButton] = React.useState<string | null>(null)

  useEffect(() => {
    if (!question) return

    ButtonPress.getInstance().reset()

    const buttonPress = ButtonPress.getInstance()
    const updateButton = () => {
      console.log("SETTING PRESSED BUTTON:", buttonPress.firstButtonPressed)
      setPressedButton(buttonPress.firstButtonPressed)
    }

    updateButton()

    buttonPress.onButtonPressed(updateButton)

    return () => {
      buttonPress.offButtonPressed(updateButton)
    }
  }, [question])

  if (!question) return null

  return (
    <div className="modal">
      <div className="modal-content-host">
        <h2>${question.value}</h2>
        <p>Question: {question.question}</p>
        <p>Answer: {question.answer}</p>
        {pressedButton ? (
          <>
            <p>First button pressed: {ScoreTracker.getInstance().getName(pressedButton)}</p>
            <button onClick={() => onIncorrect(pressedButton)}>Incorrect</button>
            <button onClick={() => onCorrect(pressedButton)}>Correct</button>
          </>
        ) : (
          <p>No button pressed yet</p>
        )}
      </div>
    </div>
  )
}

export default QuestionModal
