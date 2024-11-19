const quizData = [
    {
        question: "What is the primary benefit of yoga?",
        answers: [
            { text: "Increases strength", correct: true },
            { text: "Improves sleep", correct: true },
            { text: "Boosts energy", correct: true },
            { text: "All of the above", correct: true },
        ],
    },
    {
        question: "Which yoga pose is also known as the 'downward-facing dog'?",
        answers: [
            { text: "Adho Mukha Svanasana", correct: true },
            { text: "Utkatasana", correct: false },
            { text: "Tadasana", correct: false },
            { text: "Vrikshasana", correct: false },
        ],
    },
    {
        question: "How many primary series are there in Ashtanga Yoga?",
        answers: [
            { text: "1", correct: false },
            { text: "3", correct: false },
            { text: "6", correct: true },
            { text: "8", correct: false },
        ],
    },
    {
        question: "Which of the following is NOT a yoga style?",
        answers: [
            { text: "Hatha", correct: false },
            { text: "Vinyasa", correct: false },
            { text: "Zumba", correct: true },
            { text: "Iyengar", correct: false },
        ],
    },
    {
        question: "What does 'Namaste' mean?",
        answers: [
            { text: "Thank you", correct: false },
            { text: "I bow to you", correct: true },
            { text: "Goodbye", correct: false },
            { text: "Welcome", correct: false },
        ],
    },
    {
        question: "Which of the following is a breathing technique used in yoga?",
        answers: [
            { text: "Pranayama", correct: true },
            { text: "Asana", correct: false },
            { text: "Meditation", correct: false },
            { text: "Savasana", correct: false },
        ],
    },
    {
        question: "What is the meaning of the term 'chakra'?",
        answers: [
            { text: "Energy center", correct: true },
            { text: "Pose", correct: false },
            { text: "Meditation", correct: false },
            { text: "Breath", correct: false },
        ],
    },
    {
        question: "Which yoga style focuses on alignment and precision?",
        answers: [
            { text: "Kundalini", correct: false },
            { text: "Ashtanga", correct: false },
            { text: "Iyengar", correct: true },
            { text: "Bikram", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    nextButton.style.display = 'none';
    answerButtonsElement.innerHTML = ''; // Clear previous correct answer text
    showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtonsElement.appendChild(button);
    });
    clearCorrectAnswerText(); // Clear any previous correct answer text
}

function selectAnswer(answer, button) {
    const isCorrect = answer.correct;
    if (isCorrect) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        showCorrectAnswer(quizData[currentQuestionIndex].answers);
    }

    const totalQuestions = quizData.length;
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        nextButton.style.display = 'block';
    } else {
        showResult();
    }

    const buttons = answerButtonsElement.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
}

function showCorrectAnswer(answers) {
    const correctAnswer = answers.find(answer => answer.correct);
    const correctAnswerText = document.createElement('p');
    correctAnswerText.innerText = `Correct Answer: ${correctAnswer.text}`;
    correctAnswerText.classList.add('correct-answer-text'); // Optional styling class
    answerButtonsElement.appendChild(correctAnswerText);
}

function clearCorrectAnswerText() {
    const existingText = document.querySelector('.correct-answer-text');
    if (existingText) {
        existingText.remove(); // Remove any previous correct answer text
    }
}

function nextQuestion() {
    nextButton.style.display = 'none';
    showQuestion(quizData[currentQuestionIndex]);
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.innerText = `${score} out of ${quizData.length}`;
    restartButton.style.display = 'block'; 
}

function restartQuiz() {
    startQuiz();
}

startQuiz();
