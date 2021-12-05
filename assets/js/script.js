const question = document.getElementById("question");
const question = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the javascript?",
        choice1: "<script>",
        choice2: "<js>",
        choice3: "<java>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "Inside which HTML element do we put the css?",
        choice1: "<c>",
        choice2: "<ss>",
        choice3: "<css>",
        choice4: "<styles>",
        answer: 3
    },
    {
        question: "Inside which HTML element do we put the html?",
        choice1: "<h>",
        choice2: "<t>",
        choice3: "<m>",
        choice4: "<html>",
        answer: 4
    },
]

// constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions;)
    getNewQuestion();
};

getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
};

startGame();









// const startButton = document.getElementById('start-button')
// const nextButton = document.getElementById('next-button')
// const questionBox = document.getElementById('question-box')
// const questionElement = document.getElementById('question')
// const answerButtonsElement = document.getElementById('answer-buttons')


// startButton.addEventListener('click', startGame)
// nextButton.addEventListener('click', () => {
//     currentQuestionIndex++
//     nextQuestion()
// })

// let shuffleQuestions, currentQuestionIndex

// function startGame() {
//     startButton.classList.add('hide')
//     shuffleQuestions = questions.sort(() => Math.random() - .5)
//     currentQuestionIndex = 0
//     questionBox.classList.remove('hide')
//     nextQuestion() 
// }

// function nextQuestion() {
//     resetState()
//     showQuestion(shuffleQuestions[currentQuestionIndex])
    

// }

// function showQuestion(question) {
//     questionElement.innerText = question.question
//     question.answers.forEach(answer => {
//         const button = document.createElement('button')
//         button.innerText = answer.text
//         button.classList.add('button1')
//         if (answer.correct) {
//             button.dataset.correct = answer.correct 
//         }
//         button.addEventListener('click', chooseAnswer)
//         answerButtonsElement.appendChild(button)
//     })
// }

// function resetState() {
//     nextButton.classList.add('hide')
//     while (answerButtonsElement.firstChild) {
//         answerButtonsElement.removeChild
//         (answerButtonsElement.firstChild)
//     }
// }

// function chooseAnswer(e) {
//     const selectedButton = e.target
//     const correct = selectedButton.dataset.correct
//     setStatusClass(document.body, correct)
//     Array.from(answerButtonsElement.children).forEach(button => {
//         setStatusClass(button, button.dataset.correct)
//     })
//     if (shuffleQuestions.length > currentQuestionIndex + 1) {
//         nextButton.classList.remove('hide')
//     } else {
//         startButton.innerText = 'Restart'
//         startButton.classList.remove('hide')
//     }
    
// }

// function setStatusClass(element, correct) {
//     clearStatusClass(element)
//     if (correct) {
//         element.classList.add('button-correct')
        
//     } else {
//         element.classList.add('button-wrong')
//     }
// }

// function clearStatusClass(element) {
//     element.classList.remove('button-correct')
//     element.classList.remove('button-wrong')
// }

// const questions = [
//     {
//         question: 'What is 2 +2?',
//         answers: [
//             { text: '4', correct: true },
//             { text: '22', correct: false }
//         ]
//     }
// ]