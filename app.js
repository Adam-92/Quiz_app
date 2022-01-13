
/*--------Variables DOM-----------------*/
const allInputs = document.querySelectorAll(".answer");
const questionE1 = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const button = document.getElementById("submit");
const quiz_id = document.querySelector(".quiz-container");
const error_p = document.querySelector('.error')
const progres_bar = document.querySelector('.progress-bar')
/* -------Variables-------------------*/
let currentQuestion = 0; 
let arrayAnswers = [];
let userAnswer = false;
let points = 0;
let error = false;


/*----------Quiz questions and answers------- */
const quizData = [
  {
    question: "Who is the best midlaner in LoL?",
    a: "akali",
    b: "katahrina",
    c: "TF",
    d: "fizz",
    correct: "d",
  },
  {
    question: "what is the best programming language?",
    a: "C",
    b: "C++",
    c: "php",
    d: "javascript",
    correct: "d",
  },
  {
    question: "How old is Adam",
    a: "29",
    b: "27",
    c: "26",
    d: "28",
    correct: "d",
  },
  {
    question: "What's true name of my dog?",
    a: "misha",
    b: "sasha",
    c: "miszka",
    d: "i'm not sure",
    correct: "d",
  },
  {
    question: "What's dad favourite thing?",
    a: "movies",
    b: "talking",
    c: "lying",
    d: "smoking",
    correct: "d",
  },
];

class Quiz {
    constructor(){
        this.userAnswer = ''
        this.currentQuestion = 0
        this.arrayAnswers = []
        this.score = 0
    }
    getCurrentQuestion(){
        return this.currentQuestion
    }
    getArrayAnswers(){
        return this.arrayAnswers
    }
    getUserAnswer(){
        return this.userAnswer
    }
    getScore(){
        return this.score
    }
    getScore(){
        return this.score
    }
    setUserAnswer(answer){
        this.answer = answer
    }
    addScore(){
        this.score++
    }
    addUserAnswer(answer){
        this.arrayAnswer.push(answer)
    }
    IncrementQuestion(){
        this.currentQuestion++
    } 
}

class UI {
    constructor(){
        this.error = false
    }
    loadQuiz(){
        this.deselectAnswers()
        const currentQuizData = quizData[this.currentQuestion];
        question.innerText = currentQuizData.question;

        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
    }
    deselectAnswers(){
        allInputs.forEach( input=>{
            input.checked = false
        })
/*         const quiz = new Quiz()
           quiz.setUserAnswer(true) */
    }

}


const quiz = new Quiz('Adam')
quiz.getAllData()




function loadQuiz() {
    addProgressBar()
    deselectAnswers()

    const currentQuizData = quizData[currentQuestion];
    questionE1.innerText = currentQuizData.question;
  
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

}

function getSelect() {
    allInputs.forEach( answer => {
      if(answer.checked) {
        userAnswer = answer.id;
      }
    });
    return userAnswer;
}

function deselectAnswers() {
    allInputs.forEach((input) => {
      input.checked = false;
    });
    userAnswer = ''
  }

function errorDisplay(answer){
    if(answer){
        error = false
        error_p.innerText = ""
    }else{
        error = true
        error_p.innerText = "Please choose the answer"
        loadQuiz()
        
    }
}

function addProgressBar(){
    const numberOfQuestions = quizData.length;
    let divWithQuestions = ''
    for(let i=0; i<numberOfQuestions - 1; i++ ){
        divWithQuestions += `<div class="question">${i}</div>`
    }
  
    progres_bar.innerHTML = divWithQuestions
}




button.addEventListener("click", () => {
  //this is the user choosen answer
  const answer = getSelect();
  errorDisplay(answer)  
  //store the answer
  arrayAnswers.push(answer);
  //countPoints
  if ( (arrayAnswers[currentQuestion] === quizData[currentQuestion].correct)  && (!error) ) {
    points++;
  }

  if ( (currentQuestion < quizData.length - 1) && (!error) ) {
    progres_bar.children[0].classList.add('addTransition')
    currentQuestion++;
    loadQuiz();
  } else if( (currentQuestion === quizData.length -1 ) && (!error)) {
    quiz_id.innerHTML = `
            <h2 class="score">The score achived is ${points}/${quizData.length}. </h2>
            <button class="submit" onclick="location.reload()">RELOAD</button>
            `;
  }

});


addEventListener('DOMContentLoaded', () => {
    loadQuiz()
})






