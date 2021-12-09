// DOM queering 
const question = document.getElementById('question');
// We want to return an array so that we can use it... specifically the dataset property which will help determine the correct answers
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
// Variables below
let currentQuestion = {}; // this is an object
let acceptingAnswers = false;// we don't want to allow users to answer until everything is loaded hence the false
let score = 0;
let questionCounter = 0; //What question are you on
let availableQuestions = []; //empty array for hard coded questions so that we don't give the same questions twice

let questions = []; // an array remove the hard coded questions afterwards 

fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0,
                loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });
            return formattedQuestion;
        });
        startGame();
    });
// .catch((err) => {
// console.error(err);
// });

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10; //How many questions in the game


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // The three dots means take the question array and spread out all of its items and 
    //put them into a new array we want a full copy so that when changes are made they are reflected in this 
    getNewQuestion(); 
    game.classList.remove("hide");
    loader.classList.add("hide");
};

// function to get new questions
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) { // || means or
        localStorage.setItem('mostRecentScore', score); //store the users score
        // go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++; //This means that the counter will increment each question
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // To get random questions so that we can randomise the order of questions
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question; //Sets the question or populates it

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number]; // Getting the choices plus the dataset number property
    });

    availableQuestions.splice(questionIndex, 1); //Takes the available questions array and splices out the one we just used

    acceptingAnswers = true; //This will allow users to answer because the questions are now loaded
};
//We want to add event listeners so we know a choice has been chosen
choices.forEach(choice => {
    choice.addEventListener("click", e => { 
        if (!acceptingAnswers) return; //if we're not ready then return (ignore) the fact they clicked

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion(); //Loads a new question
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}