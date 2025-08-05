export interface Question {
  id: string
  category: string
  value: number
  question: string
  answer: string
  asked: boolean
}

export interface Category {
  name: string
  questions: Question[]
}

export interface Player {
  name: string
  score: number
}
