import type { Category } from "../types"

export const sampleCategories: Category[] = [
  {
    name: "Science",
    questions: [
      { id: "sci-100", category: "Science", value: 100, question: "What planet is known as the Red Planet?", answer: "Mars", asked: false },
      { id: "sci-200", category: "Science", value: 200, question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide", asked: false },
      { id: "sci-300", category: "Science", value: 300, question: "What is the chemical symbol for water?", answer: "H2O", asked: false },
      { id: "sci-400", category: "Science", value: 400, question: "How many bones are in the adult human body?", answer: "206", asked: false },
      { id: "sci-500", category: "Science", value: 500, question: "What part of the cell contains DNA?", answer: "Nucleus", asked: false },
    ],
  },
  {
    name: "History",
    questions: [
      { id: "his-100", category: "History", value: 100, question: "Who was the first president of the United States?", answer: "George Washington", asked: false },
      { id: "his-200", category: "History", value: 200, question: "In what year did World War II end?", answer: "1945", asked: false },
      { id: "his-300", category: "History", value: 300, question: "Which empire built the Colosseum?", answer: "Roman Empire", asked: false },
      { id: "his-400", category: "History", value: 400, question: "Who was known as the Maid of Orléans?", answer: "Joan of Arc", asked: false },
      { id: "his-500", category: "History", value: 500, question: "What was the name of the ship on which the Pilgrims traveled to America?", answer: "Mayflower", asked: false },
    ],
  },
  {
    name: "Literature",
    questions: [
      { id: "lit-100", category: "Literature", value: 100, question: 'Who wrote "Romeo and Juliet"?', answer: "William Shakespeare", asked: false },
      { id: "lit-200", category: "Literature", value: 200, question: "What is the name of the wizarding school in Harry Potter?", answer: "Hogwarts", asked: false },
      { id: "lit-300", category: "Literature", value: 300, question: 'Who is the author of "The Great Gatsby"?', answer: "F. Scott Fitzgerald", asked: false },
      { id: "lit-400", category: "Literature", value: 400, question: "Which novel begins with “Call me Ishmael”?", answer: "Moby-Dick", asked: false },
      { id: "lit-500", category: "Literature", value: 500, question: 'Who wrote "One Hundred Years of Solitude"?', answer: "Gabriel García Márquez", asked: false },
    ],
  },
  {
    name: "Geography",
    questions: [
      { id: "geo-100", category: "Geography", value: 100, question: "What is the capital of France?", answer: "Paris", asked: false },
      { id: "geo-200", category: "Geography", value: 200, question: "Which continent is the Sahara Desert in?", answer: "Africa", asked: false },
      { id: "geo-300", category: "Geography", value: 300, question: "Which country has the most people?", answer: "China", asked: false },
      { id: "geo-400", category: "Geography", value: 400, question: "What river runs through Egypt?", answer: "Nile", asked: false },
      { id: "geo-500", category: "Geography", value: 500, question: "What is the smallest country in the world?", answer: "Vatican City", asked: false },
    ],
  },
  {
    name: "Movies",
    questions: [
      { id: "mov-100", category: "Movies", value: 100, question: 'Who directed "Jurassic Park"?', answer: "Steven Spielberg", asked: false },
      { id: "mov-200", category: "Movies", value: 200, question: "What is the highest-grossing film of all time?", answer: "Avatar", asked: false },
      { id: "mov-300", category: "Movies", value: 300, question: 'Which movie features the quote "I\'ll be back"?', answer: "The Terminator", asked: false },
      { id: "mov-400", category: "Movies", value: 400, question: 'Who played the Joker in "The Dark Knight"?', answer: "Heath Ledger", asked: false },
      { id: "mov-500", category: "Movies", value: 500, question: 'Which director is known for the "Inception" and "Interstellar"?', answer: "Christopher Nolan", asked: false },
    ],
  },
  {
    name: "Sports",
    questions: [
      { id: "spo-100", category: "Sports", value: 100, question: "How many players are on a basketball team?", answer: "5", asked: false },
      { id: "spo-200", category: "Sports", value: 200, question: "What sport is known as the 'king of sports'?", answer: "Soccer", asked: false },
      { id: "spo-300", category: "Sports", value: 300, question: "What is the national sport of Japan?", answer: "Sumo", asked: false },
      { id: "spo-400", category: "Sports", value: 400, question: "Which country has won the most World Cups?", answer: "Brazil", asked: false },
      { id: "spo-500", category: "Sports", value: 500, question: "What is the maximum score in a single frame of bowling?", answer: "30", asked: false },
    ],
  },
  {
    name: "Music",
    questions: [
      { id: "mus-100", category: "Music", value: 100, question: "Who is known as the King of Pop?", answer: "Michael Jackson", asked: false },
      { id: "mus-200", category: "Music", value: 200, question: "What is the highest vocal range for a male singer?", answer: "Countertenor", asked: false },
      { id: "mus-300", category: "Music", value: 300, question: "Which composer became deaf later in life?", answer: "Beethoven", asked: false },
      { id: "mus-400", category: "Music", value: 400, question: "What is the name of the Beatles' first album?", answer: "Please Please Me", asked: false },
      { id: "mus-500", category: "Music", value: 500, question: "Who is the lead singer of U2?", answer: "Bono", asked: false },
    ],
  },
]
