import React from "react"
import type { Question } from "../types"
import { ScoreTracker } from "../systems/ScoreTracker"

interface Props {
  question: Question | null
}

const QuestionModal: React.FC<Props> = ({ question }) => {
  const [pressedButton, setPressedButton] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      const { type, data } = event.data

      if (type === "buttonPressed" && data) {
        setPressedButton(data)
        return
      }
      if (type === "resetButtonPress") {
        setPressedButton(null)
        return
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  if (!question) return null

  return (
    <div className="modal">
      <div className="modal-content-user">
        <p>{question.question}</p>
        {pressedButton && <p>Answering: {ScoreTracker.getInstance().getName(pressedButton)}</p>}
      </div>
    </div>
  )
}

export default QuestionModal
