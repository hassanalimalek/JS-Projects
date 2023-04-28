import Question from "./question.js";
import Quiz from "./quiz.js";
import QuizData from '../quizData.json' assert { type: "json" }

// Dom query
const quizEl = document.querySelector('.quiz');
const quizQuestionEl = document.querySelector(".quiz-question");
const currentQuestionIndexEl = document.querySelector('.current-question-index');
const lastQuestionIndexDivEl = document.querySelector('.last-question-index');
const quizProgressInnerEl = document.querySelector('.quiz-progress-inner');
const quizProgressTextEl = document.querySelector('.quiz-progress-text');
const quizOptionsEl = document.querySelector('.quiz-options');
const nextButtonEl = document.querySelector('.next');
const restartButtonEl = document.querySelector('.restart');

// Creating questions
let questions = [];
QuizData.map((quizQuestionItem)=>{
    questions.push(new Question(quizQuestionItem.question,quizQuestionItem.options,quizQuestionItem.correctAnswerIndex))
})
// Creating quiz
let quiz = new Quiz(questions);

const setElValue = (element,value)=>{
    element.innerText = value
}
const renderChoices = (choices) =>{
    quizOptionsEl.innerHTML = ''
    choices.map((choice,index)=>{
        quizOptionsEl.innerHTML+= `
        <div class="quiz-option">
        <input type="radio" name="choice" id="choice${index}"  value=${index} />
        <label for="choice${index}"> <i></i>${choice}</label>
      </div>`
    })
    // let choiceDiv = 
}
const renderProgress = (quiz)=>{
    let width = quizProgressInnerEl.style.width ?  quizProgressInnerEl.style.width.slice(0,quizProgressInnerEl.style.width.length-1) : 0;
    let increaseWidthTo = (quiz.currentQuestionIndex+1) /quiz.questions.length * 100;
    let loadingInterval = setInterval(()=>{
        if(width > increaseWidthTo){
            clearInterval(loadingInterval)
        }else{
            width++;
            quizProgressInnerEl.style.width= `${width}%`
        }
    },3)
   

}

const renderAll = _=>{
    // Updating progress bar
    renderProgress(quiz);
    if(quiz.hasEnded()){
        // Render Ended screen
        console.log("quiz ended @@@")
        console.log(quiz.score)
        setElValue(quizProgressTextEl,quiz.hasEnded() ? `Quiz Complete \n Quiz Score : ${quiz.score}` : 'Pick an option below!')

    }else{
        let currentQuestion = quiz.getCurrentQuestion();
        console.log("currentquestion -->",currentQuestion)
        console.log(" -quizQuestionEl -->",quizQuestionEl)
        // Updating question
        setElValue(quizQuestionEl,currentQuestion.question)
        // Render Choices
        renderChoices(currentQuestion.options)

        // Updating question number
        setElValue(currentQuestionIndexEl,quiz.currentQuestionIndex + 1);
        setElValue(lastQuestionIndexDivEl,quiz.questions.length)
    
        // Updating quiz progress text
        setElValue('Quiz Complete')

    }
}
renderAll();

// Next Button Click
nextButtonEl.addEventListener('click',(e)=>{
    if(!quiz.hasEnded()){
        const inputChoice =  document.getElementsByName('choice');
        var selectValue= Array.from(inputChoice).find(radio => radio.checked);
        if(selectValue){
            let currentQuestion = quiz.getCurrentQuestion();
            // Correct Answer case
            if(currentQuestion.correctAnswerIndex == selectValue.value){
                console.log("Correct answer")
                quiz.score++;
                quiz.currentQuestionIndex++
                renderAll();
            }
            // Incorrect answer
            else{
                quiz.currentQuestionIndex++
                renderAll();
                console.log("Incorrect Answer")
            }
        }
    }
})


