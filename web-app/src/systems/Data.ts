import type { Category } from "../types"

export const sampleCategories: Category[] = [
  {
    name: "Minecraft",
    questions: [
      { id: "min-100", value: 100, question: "Which mob explodes when it gets close to you?  ", answer: "Creeper", asked: false },
      { id: "min-200", value: 200, question: "What do you need to make a torch?", answer: "Stick and coal (or charcoal)", asked: false },
      { id: "min-300", value: 300, question: "What do Endermen do when you look directly at them?", answer: "They become hostile and attack", asked: false },
      { id: "min-400", value: 400, question: "How do you make obsidian in Minecraft?", answer: "Pour water onto lava source blocks", asked: false },
      { id: "min-500", value: 500, question: "How do you make an Eye of Ender?", answer: "Blaze powder + Ender pearl", asked: false },
    ],
  },
  {
    name: "Chusic",
    questions: [
      { id: "chu-100", value: 100, question: "In 'Twinkle, Twinkle, Little Star,' what do we wonder about the star?", answer: "What you are", asked: false },
      { id: "chu-200", value: 200, question: "In 'The Wheels on the Bus,' what do the wipers do? ", answer: "Swish, swish, swish", asked: false },
      { id: "chu-300", value: 300, question: "Which song includes the lyrics 'Row, row, row your boat'?", answer: "Row, Row, Row Your Boat", asked: false },
      { id: "chu-400", value: 400, question: "In 'Hickory Dickory Dock,' what time did the clock strike when the mouse ran down?", answer: "One", asked: false },
      { id: "chu-500", value: 500, question: "In 'This Old Man,' what does he play on his drum?", answer: "Knick-knack paddywhack", asked: false },
    ],
  },
  {
    name: "Animals",
    questions: [
      { id: "ani-100", value: 100, question: "What is the largest land animal?", answer: "African Elephant", asked: false },
      { id: "ani-200", value: 200, question: "What type of animal is a Komodo dragon?", answer: "Lizard", asked: false },
      { id: "ani-300", value: 300, question: "Which animal is the fastest on land?", answer: "Cheetah", asked: false },
      { id: "ani-400", value: 400, question: "Which sea creature has three hearts?", answer: "Octopus", asked: false },
      { id: "ani-500", value: 500, question: "What is a group of lions called?", answer: "Pride", asked: false },
    ],
  },
  {
    name: "HP",
    questions: [
      { id: "hp-100", value: 100, question: "What is the name of Harry's owl?", answer: "Hedwig", asked: false },
      { id: "hp-200", value: 200, question: "Who is the headmaster of Hogwarts?", answer: "Albus Dumbledore", asked: false },
      { id: "hp-300", value: 300, question: "What position does Harry play in Quidditch?", answer: "Seeker", asked: false },
      { id: "hp-400", value: 400, question: "Who is Hermione’s cat?", answer: "Crookshanks", asked: false },
      { id: "hp-500", value: 500, question: "which month and year do Harry’s parents die?", answer: "October 31st, 1981", asked: false },
    ],
  },
  {
    name: "Space",
    questions: [
      { id: "spa-100", value: 100, question: "What planet is closest to the Sun?", answer: "Mercury", asked: false },
      { id: "spa-200", value: 200, question: "Which planet is known for its giant red spot?", answer: "Jupiter", asked: false },
      { id: "spa-300", value: 300, question: "How many planets are in our solar system?", answer: "Eight", asked: false },
      { id: "spa-400", value: 400, question: "What galaxy is Earth in?", answer: "Milky Way", asked: false },
      { id: "spa-500", value: 500, question: "What’s the name of the NASA rover on Mars (launched in 2020)?", answer: "Perseverance", asked: false },
    ],
  },
  {
    name: "D&P",
    questions: [
      { id: "dis-100", value: 100, question: "What is the name of the cowboy in Toy Story?", answer: "Woody", asked: false },
      { id: "dis-200", value: 200, question: "Which Disney princess has a pet tiger named Rajah?", answer: "Jasmine", asked: false },
      { id: "dis-300", value: 300, question: "What kind of fish is Nemo?", answer: "Clownfish", asked: false },
      { id: "dis-400", value: 400, question: "Who is the villain in 'The Lion King'?", answer: "Scar", asked: false },
      { id: "dis-500", value: 500, question: "In 'Inside Out', what emotion is colored blue?", answer: "Sadness", asked: false },
    ],
  },
  {
    name: "Video Games",
    questions: [
      { id: "vg-100", value: 100, question: "What kind of creature is Pikachu?", answer: "Electric-type Pokémon", asked: false },
      { id: "vg-200", value: 200, question: "In 'Among Us', what role tries to sabotage the crew?", answer: "Impostor", asked: false },
      { id: "vg-300", value: 300, question: "Which character eats ghosts in a maze?", answer: "Pac-Man", asked: false },
      { id: "vg-400", value: 400, question: "What is the princess's name in Super Mario games?", answer: "Princess Peach", asked: false },
      { id: "vg-500", value: 500, question: "What handheld console was made by Nintendo in 1989?", answer: "Game Boy", asked: false },
    ],
  },
  {
    name: "MLP",
    questions: [
      { id: "mlp-100", value: 100, question: "What is the name of the main pony with a rainbow-colored mane?", answer: "Rainbow Dash", asked: false },
      { id: "mlp-200", value: 200, question: "What is the name of the land where the ponies live?", answer: "Equestria", asked: false },
      { id: "mlp-300", value: 300, question: "Who is the princess that controls the sun?", answer: "Princess Celestia", asked: false },
      { id: "mlp-400", value: 400, question: "Which pony is known for her love of animals and nature?", answer: "Fluttershy", asked: false },
      { id: "mlp-500", value: 500, question: "Which pony throws the best parties in Ponyville?", answer: "Pinkie Pie", asked: false },
    ],
  },
  {
    name: "Music",
    questions: [
      { id: "mus-100", value: 100, question: "Which instrument has six strings and is commonly used in rock music?", answer: "Guitar", asked: false },
      {
        id: "mus-200",
        value: 200,
        question: "What are the names of the white and black keys on a piano called?",
        answer: "White keys are natural notes, black keys are sharps and flats",
        asked: false,
      },
      { id: "mus-300", value: 300, question: "What family of instruments does the trumpet belong to?", answer: "Brass", asked: false },
      { id: "mus-400", value: 400, question: "What type of instrument is a cello?", answer: "String instrument", asked: false },
      { id: "mus-500", value: 500, question: "Which classical composer became deaf later in life but continued to compose music?", answer: "Ludwig van Beethoven", asked: false },
    ],
  },
  {
    name: "Art",
    questions: [
      { id: "art-100", value: 100, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci", asked: false },
      { id: "art-200", value: 200, question: "What are the primary colors?", answer: "Red, blue, and yellow", asked: false },
      { id: "art-300", value: 300, question: "What material is traditionally used for making sculptures?", answer: "Clay, stone, or metal", asked: false },
      { id: "art-400", value: 400, question: "Which famous artist cut off part of his own ear?", answer: "Vincent van Gogh", asked: false },
      { id: "art-500", value: 500, question: "What style of art did Pablo Picasso help create?", answer: "Cubism", asked: false },
    ],
  },
  {
    name: "Science",
    questions: [
      { id: "sci-100", value: 100, question: "What planet is known as the Red Planet?", answer: "Mars", asked: false },
      { id: "sci-200", value: 200, question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide", asked: false },
      { id: "sci-300", value: 300, question: "What is the chemical symbol for water?", answer: "H2O", asked: false },
      { id: "sci-400", value: 400, question: "How many bones are in the adult human body?", answer: "206", asked: false },
      { id: "sci-500", value: 500, question: "What part of the cell contains DNA?", answer: "Nucleus", asked: false },
    ],
  },
  {
    name: "History",
    questions: [
      { id: "his-100", value: 100, question: "Who was the first president of the United States?", answer: "George Washington", asked: false },
      { id: "his-200", value: 200, question: "In what year did World War II end?", answer: "1945", asked: false },
      { id: "his-300", value: 300, question: "Which empire built the Colosseum?", answer: "Roman Empire", asked: false },
      { id: "his-400", value: 400, question: "Who was known as the Maid of Orléans?", answer: "Joan of Arc", asked: false },
      { id: "his-500", value: 500, question: "What was the name of the ship on which the Pilgrims traveled to America?", answer: "Mayflower", asked: false },
    ],
  },
  {
    name: "Literature",
    questions: [
      { id: "lit-100", value: 100, question: 'Who wrote "Romeo and Juliet"?', answer: "William Shakespeare", asked: false },
      { id: "lit-200", value: 200, question: "What is the name of the wizarding school in Harry Potter?", answer: "Hogwarts", asked: false },
      { id: "lit-300", value: 300, question: 'Who is the author of "The Great Gatsby"?', answer: "F. Scott Fitzgerald", asked: false },
      { id: "lit-400", value: 400, question: "Which novel begins with “Call me Ishmael”?", answer: "Moby-Dick", asked: false },
      { id: "lit-500", value: 500, question: 'Who wrote "One Hundred Years of Solitude"?', answer: "Gabriel García Márquez", asked: false },
    ],
  },
  {
    name: "Geography",
    questions: [
      { id: "geo-100", value: 100, question: "What is the capital of France?", answer: "Paris", asked: false },
      { id: "geo-200", value: 200, question: "Which continent is the Sahara Desert in?", answer: "Africa", asked: false },
      { id: "geo-300", value: 300, question: "Which country has the most people?", answer: "China", asked: false },
      { id: "geo-400", value: 400, question: "What river runs through Egypt?", answer: "Nile", asked: false },
      { id: "geo-500", value: 500, question: "What is the smallest country in the world?", answer: "Vatican City", asked: false },
    ],
  },
  {
    name: "Movies",
    questions: [
      { id: "mov-100", value: 100, question: 'Who directed "Jurassic Park"?', answer: "Steven Spielberg", asked: false },
      { id: "mov-200", value: 200, question: "What is the highest-grossing film of all time?", answer: "Avatar", asked: false },
      { id: "mov-300", value: 300, question: 'Which movie features the quote "I\'ll be back"?', answer: "The Terminator", asked: false },
      { id: "mov-400", value: 400, question: 'Who played the Joker in "The Dark Knight"?', answer: "Heath Ledger", asked: false },
      { id: "mov-500", value: 500, question: 'Which director is known for the "Inception" and "Interstellar"?', answer: "Christopher Nolan", asked: false },
    ],
  },
  {
    name: "Sports",
    questions: [
      { id: "spo-100", value: 100, question: "How many players are on a basketball team?", answer: "5", asked: false },
      { id: "spo-200", value: 200, question: "What sport is known as the 'king of sports'?", answer: "Soccer", asked: false },
      { id: "spo-300", value: 300, question: "What is the national sport of Japan?", answer: "Sumo", asked: false },
      { id: "spo-400", value: 400, question: "Which country has won the most World Cups?", answer: "Brazil", asked: false },
      { id: "spo-500", value: 500, question: "What is the maximum score in a single frame of bowling?", answer: "30", asked: false },
    ],
  },
  {
    name: "Music",
    questions: [
      { id: "mus-100", value: 100, question: "Who is known as the King of Pop?", answer: "Michael Jackson", asked: false },
      { id: "mus-200", value: 200, question: "What is the highest vocal range for a male singer?", answer: "Countertenor", asked: false },
      { id: "mus-300", value: 300, question: "Which composer became deaf later in life?", answer: "Beethoven", asked: false },
      { id: "mus-400", value: 400, question: "What is the name of the Beatles' first album?", answer: "Please Please Me", asked: false },
      { id: "mus-500", value: 500, question: "Who is the lead singer of U2?", answer: "Bono", asked: false },
    ],
  },
]
