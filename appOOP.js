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
const progress_bar = document.querySelector('.progress-bar')

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
    addScore(index){
        if(quizData[index].correct === this.arrayAnswers[index]){
            this.score++
        }
    }
}
/*----------- Class UI------------------- */

class UI {
    constructor(){
        this.index = 0
        this.error = false
    }
    addProgressBar() {
      const numberSections = quizData.length;
      let numberDiv = '';
      let numberFraction = ''

      for(let i=0; i<numberSections; i++){
        numberDiv += `<div class="progress-section" id="${i}">${i}</div>`
        numberFraction += '1fr '
      }

      progress_bar.innerHTML = numberDiv;
      progress_bar.style.gridTemplateColumns = `${numberFraction}`
      progress_bar.style.gridTemplateRows = '1fr'
     
    }
    colorSectionBar(sectionIndex){
        progress_bar.children[sectionIndex].style.backgroundColor = 'rgba(81, 207, 7, 0.3)'
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
    /*----- Aplication logic-------- */
    functionallityOfApp(quiz){
        /* -----Event click----------- */
        button.addEventListener('click', ()=>{
            /* Get the answer */
            const answer = this.getSelectedAnswer();
            /* Check if the answer has been selected */
            this.checkIfSelected(answer)
            /* Add answer to array and load the another question */
            if( !this.error && (this.index < quizData.length )  ){
                /* Make a transition of the progress bar */
                this.colorSectionBar(this.index)
                /* Add answer to array in Class Quiz */
                quiz.addAnswerToArray(answer)
                /* Check the correct answer and compare to array of the answers, then increase score */
                quiz.addScore(this.index)
                this.index++
                /* Loads the next question  */
                if(this.index < quizData.length){
                    this.loadQuiz(quizData)
                }
            }
            /* ------Summerize your score if there is no more questions---- */
            if( !this.error && (this.index === quizData.length ) ){
                const score = quiz.getScore()
                this.index = 0
                quiz_id.innerHTML = `
                <h2 class="score">The score achived is ${score}/${quizData.length}</h2>
                <button class="submit" onclick="location.reload()">RELOAD</button> 
                `
            }
        })
    }

}


/* ----------START APP------------------ */
addEventListener('DOMContentLoaded', ()=>{

    const ui = new UI()
    const quiz = new Quiz()
    
    /* Load the progress bar */
    ui.addProgressBar()
    /* Load the Quiz */
    ui.loadQuiz(quizData)
    /* Operation of the application */
    ui.functionallityOfApp(quiz)
    
})