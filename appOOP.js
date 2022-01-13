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

/*--------Quiz Data-------------------- */
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

/*----------- Class Quiz------------------- */
class Quiz {
    constructor(){
        this.arrayAnswers = []
        this.score = 0
    }
    getArrayAnswers(){
        return this.arrayAnswers
    }
    addAnswerToArray(answer){
        this.arrayAnswers.push(answer)
    }
    getScore(){
        return this.score
    }
    addScore(){
        quizData.forEach( (question,index) => {
            if(question.correct === this.arrayAnswers[index]){
                 this.score++     
            }
        })
    }
}
/*----------- Class UI------------------- */

class UI {
    constructor(){
        this.index = 0
        this.error = false
    }
    loadQuiz(arrayQuestions){
        this.deselectAnswer()
        const currentQuizData = arrayQuestions[this.index];
        question.innerText = currentQuizData.question;

        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
    }
    getSelectedAnswer(){
        let answerID = '';
        allInputs.forEach(answer => {
            if(answer.checked){
                answerID = answer.id
            }
        })
        return answerID
    }
    deselectAnswer(){
        allInputs.forEach( input=>{
            input.checked = false
        })
    }
    checkIfSelected(answer){
        if(answer){
            this.error = false
            error_p.innerText = ''

        }else{
            this.error = true
            error_p.innerText= 'Please choose the answer'
        }
    }
    
    functionallityOfApp(quiz){
        button.addEventListener('click', ()=>{
            /* Get the answer */
            const answer = this.getSelectedAnswer();
            /* Check if the answer has been selected */
            this.checkIfSelected(answer)
            /* Add answer to array and load the another question */
            if(!this.error && this.index <= quizData.length -1  ){
                quiz.addAnswerToArray(answer)
                quiz.addScore()
                this.index++
                this.loadQuiz(quizData)
            }
            if(!this.error && this.index > quizData.length){
                const score = quiz.getScore()
                quiz_id.innerHTML = `
                <h2 class="score">The score achived is ${score}</h2>
                <button class="submit" onclick="location.reload()">RELOAD></button> 
                `
            }

        })
    }

}

/* ----------START APP------------------ */
addEventListener('DOMContentLoaded', ()=>{
    
    const ui = new UI()
    const quiz = new Quiz()
    
    /* Load Quiz */
    ui.loadQuiz(quizData)
    /* Operation of the application */
    ui.functionallityOfApp(quiz)
    

})