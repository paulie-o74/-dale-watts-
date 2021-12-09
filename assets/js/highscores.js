//Get a reference to the highscores list
const highScoresList = document.getElementById('highScoresList');
//Then get the scores out of local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//Here we want to get the score and username and then make a list in the webpage
highScoresList.innerHTML = highScores
    .map(score => { //map takes an array of items and converts into something else
        return `<li class= "high-score">${score.name} - ${score.score}</li>`;
    })
    .join(""); //This gives you a string with all of the content you need 