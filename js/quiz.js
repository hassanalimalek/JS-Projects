
export default function Quiz(questions){
    this.questions=questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
}

Quiz.prototype.hasEnded = function(){
    return this.currentQuestionIndex === this.questions.length;
}

Quiz.prototype.nextQuestion = function(){
    this.currentQuestionIndex++;
}


Quiz.prototype.getCurrentQuestion = function(){
    return this.questions[this.currentQuestionIndex]
}
