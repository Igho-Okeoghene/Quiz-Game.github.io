const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-possible-answers"));

const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: "The best way to prevent COVID-19 is?",
        choice1: "Drink a mixture of herbs every 20 minutes",
        choice2: "Wash your hands with soap & water every 20 minutes ",
        choice3: "Drink Alcohol every 20 minutes",
        answer: 2
    },
    {
        question: "Which one of the following mask should be worn to prevent the spread of COVID-19?",
        choice1: "Head Mask",
        choice2: "Face Mask",
        choice3: "Leg Mask",  
        answer: 2
    },
    {
        question: "Which State Governor ordered officials to cane residents without face mask?",
        choice1: "Ebonyi State Governor",
        choice2: "Bauchi State Governor",
        choice3: "Jos State Governor", 
        answer: 1
    },
    {
        question: "Which State Governor gave out wraps of eba and egusi soup as COVID-19 pallative?",
        choice1: "Delta State Governor",
        choice2: "Anambra State Governor",
        choice3: "Abia State Governor", 
        answer: 3
    },
    {
        question: "What is the best way to stay safe during this COVID-19 Pandemic?",
        choice1: "Continue with your daily activities like there is no virus",
        choice2: "Live in denial of the virus",
        choice3: "Stay at home & Wash your hands regularly", 
        answer: 3
    },
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
     getNewQuestion();
};

getNewQuestion = () =>{
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("recentScore", score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerHTML = questionCounter +"/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];
    })
    availableQuestions.splice(questionIndex, 1);
   
    acceptingAnswers = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct": "incorrect";
        if ( classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 1250);
         
    });
});
incrementScore = num => {
    score += num ;
    scoreText.innerText = score;
};
 
startGame ();
