const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
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
        answer: 1,
    },
    {
        question: "Inside which HTML element do we put the css?",
        choice1: "<c>",
        choice2: "<ss>",
        choice3: "<css>",
        choice4: "<styles>",
        answer: 3,
    },
    {
        question: "Inside which HTML element do we put the html?",
        choice1: "<h>",
        choice2: "<t>",
        choice3: "<m>",
        choice4: "<html>",
        answer: 4,
    },
]

// constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();


// end page javascript


// const username = document.getElementById("username");
// const saveScoreButton = document.getElementById("saveScoreButton");
// if (saveScoreButton) {
//     username.addEventListener("keyup" , () => {
//     saveScoreButton.disabled = !username.value;
// })};

// saveHighScore = e => {
//     console.log("clicked the save button!");
//     e.preventDefault();
// };






