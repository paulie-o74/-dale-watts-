//constants
const username = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const finalScore = document.getElementById("finalScore");
//This gets the most recent score for the end page
const mostRecentScore = localStorage.getItem('mostRecentScore'); // you could go to developer page and change this if you wanted to 
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //local storage really only likes strings, doesn't work well with other objects but we are converting it back from a string here 
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => { 
    saveScoreButton.disabled = !username.value; // if nothing is typed into this field then you can't use the button (submit)
});

saveHighScore = e => { //get the event
    console.log("clicked the save button!");
    e.preventDefault(); // a form will automatically save and submit to a new page... this will stop this (posting to a new page)

    const score = {
        score: Math.floor(Math.random() * 100), //random scores 
        name: username.value
    }
    highScores.push(score); //adding the most recent score to the array
    highScores.sort((a, b) => b.score - a.score) //sorts the scores from high to low
    highScores.splice(5); // only saving the top 5 scores
    localStorage.setItem("highScores", JSON.stringify(highScores)); // here we are converting it to astring 
    window.location.assign("index.html") // Then we go back home 
};