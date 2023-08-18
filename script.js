
const questions = [
{
    question: "Which is the deepest oceanic trench in the world?",
    answers: [
              { text: "Mariana Trench", correct: true},
              { text: "Puerto Rico Trench", correct: false},
              { text: "Romanche Trench", correct: false},
              { text: "Chilean Trench", correct: false},
    ]
},
{
    question: "Which is the most dangerous mountain in the world?",
    answers: [
          { text: "K2", correct: false},
          { text: "Kanchenjunga", correct: false},
          { text: "Annapurna I", correct: true},
          { text: "Nanga Parbat", correct: false},
]
},
{
    question: "Which is the smallest country in the world?",
    answers: [
          { text: "Vatican City", correct: true},
          { text: "Tokelau", correct: false},
          { text: "Monaco", correct: false},
          { text: "Gibraltar", correct: false},
]
},
{   question: "Which is the smallest desert in the world?",
    answers: [
          { text: "Carcross Desert", correct: true},
          { text: "Bledow Desert", correct: false},
          { text: "Atacama Desert", correct: false},
          { text: "Ladakh Desert", correct: false},
]
},
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');


let currentQuestionIndex= 0;
let currentQuestion= 0
let score = 0;

function startQuiz() {
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;



  currentQuestion.answers.forEach(answers => {
      const button = document.createElement("button");
      button.innerHTML = answers.text;
      button.classList.add("btn");
      answerButton.appendChild(button);
      if(answers.correct){
      button.dataset.correct = answers.correct;
      } 
      button.addEventListener("click", selectAnswer)
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);

  };
};


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
          button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
    } 

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
      }else{
            startQuiz();
        }
    }
    )

startQuiz();
