// Quiz questions
const questions = [
    {
        question: "What's the best way to survive a zombie apocalypse?",
        answers: [
            { text: "Wear a bucket on your head and climb a roof with a broom.", correct: false },
            { text: "Find a zombie with leadership potential and negotiate a peace treaty.", correct: true },
            { text: "Gather a team of highly trained cats as your defense squad.", correct: false },
            { text: "Act like a Capybara.", correct: false },
        ],
    },
    {
        question: "Why did the chicken cross the road?",
        answers: [
            { text: "It heard there was a big sale on corn on the other side.", correct: false },
            { text: "It was her choice.", correct: false },
            { text: "To attend a secret meeting of the Poultry Resistance Movement.", correct: false },
            { text: "Because you didn't cook it.", correct: true },
        ],
    },
    {
        question: "Who put the alphabet in alphabetic order?",
        answers: [
            { text: "The Ancient Indian Cats, who secretly controlled the world.", correct: true },
            { text: "The International Association of Alphabetizers.", correct: false },
            { text: "The Secret Society of Scrabble Enthusiasts.", correct: false },
            { text: "The Letter Committee.", correct: false },
        ],
    },
    {
        question: "Why would a cat be seen wearing glasses and carrying a notepad?",
        answers: [
            { text: "It's undercover, writing a tell-all book about human behavior.", correct: false },
            { text: "It's the feline editor-in-chief of Cat Fancy magazine.", correct: false },
            { text: "It's researching naps and sunbeams.", correct: false },
            { text: "It's keeping track of how many times humans open the refrigerator.", correct: true },
        ],
    },
];

// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Quiz state
let currentQuestionIndex = 0;
let score = 0;

// Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0; // Reset the score
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none"; // Hide 'Next' button initially
    showQuestion(); // Show the first question
}

function showQuestion() {
    resetState(); // Clear previous answers and hide 'Next' button
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = "true"; // Indicate correct answer
        }
        button.addEventListener("click", selectAnswer); // Add event listener for button clicks
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none"; // Hide 'Next' button
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Clear existing answer buttons
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score += 1; // Increment the score for correct answer
    } else {
        selectedButton.classList.add("incorrect");
    }
    
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlight the correct answer
        }
        button.disabled = true; // Disable all answer buttons
    });

    nextButton.style.display = "block"; // Show 'Next' button after an answer is selected
}

function showScore() {
    resetState(); // Clear existing answer buttons
    questionElement.innerHTML = `Quiz complete! Your score is ${score}/${questions.length}.`; // Show the final score
    nextButton.innerHTML = "Play Again"; // Change the 'Next' button to 'Play Again'
    nextButton.style.display = "block"; // Keep the 'Next' button visible to restart the quiz
}

function handleNextButton() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex += 1; // Move to the next question
        showQuestion(); // Display the next question
    } else {
        showScore(); // If no more questions, show the final score
    }
}

// Event listeners
nextButton.addEventListener("click", handleNextButton); // When 'Next' or 'Play Again' is clicked

// Start the quiz
startQuiz(); // Begin the quiz when the script is loaded
