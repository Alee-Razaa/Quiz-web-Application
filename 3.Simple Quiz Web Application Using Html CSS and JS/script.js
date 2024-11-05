const questions = [
  {
    question: "What is the capital of France?",
    answer: [
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Mars", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'Hamlet'?",
    answer: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Leo Tolstoy", correct: false },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answer: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false },
      { text: "O2", correct: false },
    ],
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    answer: [
      { text: "Elephant", correct: false },
      { text: "Tiger", correct: false },
      { text: "Lion", correct: true },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our Solar System?",
    answer: [
      { text: "Earth", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
    ],
  },
  {
    question: "What is the powerhouse of the cell?",
    answer: [
      { text: "Nucleus", correct: false },
      { text: "Mitochondria", correct: true },
      { text: "Ribosome", correct: false },
      { text: "Chloroplast", correct: false },
    ],
  },
  {
    question: "How many continents are there?",
    answer: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answer: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What is the smallest prime number?",
    answer: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
];

// const questionElement = document.getElementById("question");
// const answerButtons = document.getElementById("answer-buttons");
// const nextButton = document.getElementById("next-btn");
// let currentQuestionIndex = 0;
// let score = 0;

// nextButton.addEventListener("click", () => {
//   currentQuestionIndex++;
//   if (currentQuestionIndex < questions.length) {
//     showQuestion();
//   } else {
//     nextButton.innerHTML = "Re-Start";
//     answerButtons.innerHTML = "";
//     questionElement.innerHTML =
//       "Correct Answer: " + score + "\nScore: " + score * 10;
//     nextButton.style.display = "block";
//     nextButton.addEventListener("click", ready);
//   }
// });

// ready();

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function ready() {
  nextButton.innerHTML = "Start";
  answerButtons.innerHTML = "";
  questionElement.innerHTML = "Are You Ready!";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
  answerButtons.innerHTML = "";
  nextButton.style.display = "none";

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score += 1;
    selectedButton.classList.add("correct");
    console.log("Correct answer! Score:", score);
  } else {
    selectedButton.classList.add("incorrect");
    console.log("Incorrect answer! Score:", score);
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Disable all buttons after selection
  });

  nextButton.style.display = "block";
  setupNextButtonForQuiz(); // Prepare nextButton for moving to the next question
}

function setupNextButtonForQuiz() {
  //   clearEventListeners(nextButton); // Clear any previous click events

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      // Use the full questions length
      showQuestion();
    } else {
      displayResults();
    }
  });
}

function displayResults() {
  // Prepare UI for displaying the final score and restart option
  nextButton.innerHTML = "Re-Start";
  answerButtons.innerHTML = ""; // Clear answer buttons
  questionElement.innerHTML = `Correct Answer: ${score} out of ${
    questions.length
  } <br>Score: ${score * 10}`;
  nextButton.style.display = "block";
}

function clearEventListeners(element) {
  const newElement = element.cloneNode(true);
  element.replaceWith(newElement);
  return newElement;
}
function clearEventListeners(element) {
  const newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
  return newElement;
}

// Start by calling the ready function to set up the initial state
ready();
