// DOM queering 
const question = document.getElementById('question');
// We want to return an array so that we can use it... specifically the dataset property which will help determine the correct answers
const choices = Array.from(document.getElementsByClassName('choice-text'));
//HUD elements
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
//loader element while waiting for questions to load
const loader = document.getElementById('loader');
const game = document.getElementById('game');
// Variables below
let currentQuestion = {}; // this is an object
let acceptingAnswers = false;// we don't want to allow users to answer until everything is loaded hence the false
let score = 0;
let questionCounter = 0; //What question are you on
let availableQuestions = []; //empty array for hard coded questions so that we don't give the same questions twice

let questions = []; // an array remove the hard coded questions afterwards 

fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple') //open api instead of pulling from JSON file hard coded questions 
    .then((res) => {
        return res.json(); //pulls the questions 
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map(loadedQuestion => { //map to covert go through the array and map or change to something else 
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers]; // using spread operator to get an array
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1; //This will give a random position for the correct answer
            answerChoices.splice(formattedQuestion.answer - 1, 0, //Then add them in and -1 because one is a 0 based index and dataset isn't 
                loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => { //getting references for both as we iterate through the answers
                formattedQuestion['choice' + (index + 1)] = choice;
            });
            return formattedQuestion; 
        });
        startGame(); //then start the game 
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
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`; //string concatenation to "make" HTML

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

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //== checks if they are equal but not strictly equal because one is a string and one isn't
        // to be more concise we can use ternary operator... ? if this is true : if not 

        if (classToApply === "correct") { // to signify to the user if they were right or wrong and this will increment the score via the function below
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(() => { // built in function in JS
            selectedChoice.classList.remove(classToApply);
            getNewQuestion(); //Loads a new question
        }, 1000); //waits for 1 second before executing this function
    })
})

// incrementing score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}