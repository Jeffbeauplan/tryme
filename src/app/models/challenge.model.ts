export class Challenge {
  $key: string
  title: string
  author: string
  category: string[]
  topScore: number
  topScorer: string
  timesPlayed: number
  questions: Question[]
  numberOfQuestions: number
}

export class Question {
  question: string
  correctAnswer: string
  wrongAnswers: string[]
}
