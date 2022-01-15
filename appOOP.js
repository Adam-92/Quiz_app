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
      question: "Where did the powers of Spiderman come from?",
      a: "He was born with them",
      b: "He was bitten by a radioactive spider",
      c: "He went through a scientific experiment",
      d: "He woke up with them after a dream",
      correct: "b",
    },
    {
      question: "What does the term “SOS” commonly stand for?",
      a: "Save Our Sheep",
      b: "Save Our Ship",
      c: "Save Our Seal",
      d: "Save Our Souls",
      correct: "d",
    },
    {
      question: " What is the speed of sound?",
      a: "120 km/h",
      b: "1,200 km/h",
      c: "400 km/h",
      d: "700 km/h",
      correct: "b",
    },
    {
      question: "Goulash is a type of beef soup in which country?",
      a: "Hungary",
      b: "Czech Republic",
      c: "Slovakia",
      d: "Ireland",
      correct: "a",
    },
    {
      question: "Which of the following animals can run the fastest?",
      a: "Cheetah",
      b: "Leopard",
      c: "Tiger",
      d: "Lion",
      correct: "a",
    },
    {
      question: 'The two biggest exporters of beers in Europe are Germany and …',
      a: 'Spain',
      b: 'France',
      c: 'Italy',
      d: 'Belgium',
      correct: 'd'
    },
    {
        question: 'Which was the first film by Disney to be produced in colour?',
        a: 'Toy Story',
        b: 'Sleeping Beauty',
        c: 'Snow White and the Seven Dwarfs',
        d: 'Cinderella',
        correct: 'c'
      },
      {
        question: 'Which of the following is a song by the German heavy metal band “Scorpions”?',
        a: 'Stairway to Heaven',
        b: 'Wind of Change',
        c: 'Don’t Stop Me Now',
        d: 'Hey Jude',
        correct: 'b'
      },
      {
        question: 'Which of the following actors was the first one to play James Bond?',
        a: 'Timothy Dalton',
        b: 'Roger Moore',
        c: 'Sean Connery',
        d: 'George Lazenby',
        correct: 'c'
      },
      {
        question: 'The phrase: ”I think, therefore I am” was coined by which philosopher?',
        a: 'Socrates',
        b: 'Plato',
        c: 'Aristotle',
        d: 'Descartes',
        correct: 'd'
      }
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