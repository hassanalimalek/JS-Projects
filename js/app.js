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
    let increaseWidthTo = (quiz.currentQuestionIndex) /quiz.questions.length * 100;
    if(increaseWidthTo == 0){
        quizProgressInnerEl.style.width = `0%`
    }else{
        let loadingInterval = setInterval(()=>{
            if(width > increaseWidthTo){
                clearInterval(loadingInterval)
            }else{
                width++;
                quizProgressInnerEl.style.width= `${width}%`
            }
        },3)
    }
   
}

const getQuizCompletionTitleMessage=(quiz)=>{
    let scorePercentage = (quiz.score) /quiz.questions.length * 100;
    let msg = ''
    if(scorePercentage === 100){
        msg = 'Excellent'
    }else if(scorePercentage >=70){
        msg = 'Splendid Job'
    }else if(scorePercentage >0){
        msg = 'Good Job'
    }else{
        msg = 'Better luck next time'
    }
    return msg;
}

const renderAll = _=>{
    // Updating progress bar
    renderProgress(quiz);
    if(quiz.hasEnded()){
        // Render Ended screen
        setElValue(quizQuestionEl,getQuizCompletionTitleMessage(quiz))
        setElValue(currentQuestionIndexEl,'Score : ')
        setElValue(lastQuestionIndexDivEl, (quiz.score) /quiz.questions.length * 100)
        setElValue(quizProgressTextEl,`Quiz Complete`)
        nextButtonEl.style.opacity = 0;

    }else{
        let currentQuestion = quiz.getCurrentQuestion();
        console.log("currentquestion -->",currentQuestion)
        console.log(" -quizQuestionEl -->",quizQuestionEl)
        // Updating question
        setElValue(quizQuestionEl,currentQuestion.question)
        // Render Choices
        renderChoices(currentQuestion.options)

        // Updating question number
        setElValue(currentQuestionIndexEl,`${quiz.currentQuestionIndex + 1} of`);
        setElValue(lastQuestionIndexDivEl,quiz.questions.length)
    
        // Updating quiz progress text
        setElValue(quizProgressTextEl,'Pick an option below!')

    }
}
renderAll();

// Next Button Click
nextButtonEl.addEventListener('click',(e)=>{
    if(!quiz.hasEnded()){
        const inputChoice =  document.querySelector('input[name="choice"]:checked');
        console.log("inputChoice --->",inputChoice)
        if(inputChoice?.checked){
            let currentQuestion = quiz.getCurrentQuestion();
            // Correct Answer case
            if(currentQuestion.correctAnswerIndex == inputChoice.value){
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

// Restart Button Click
restartButtonEl.addEventListener('click',()=>{
    quiz.reset()
    nextButtonEl.style.opacity = 1;
    renderAll()
})


