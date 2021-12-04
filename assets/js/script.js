const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionBox = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

let shuffleQuestions, currentQuestionIndex

function startGame() {
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionBox.classList.remove('hide')
    nextQuestion() 
}

function nextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
    

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button1')
        if (answer.correct) {
            button.dataset.correct = answer.correct 
        }
        button.addEventListener('click', chooseAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function chooseAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('button-correct')
        
    } else {
        element.classList.add('button-wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('button-correct')
    element.classList.remove('button-wrong')
}

const questions = [
    {
        question: 'What is 2 +2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }
]