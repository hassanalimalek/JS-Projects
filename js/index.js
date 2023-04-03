
// Config and Scores;
let userScore = 0;
let compScore = 0;
let rounds = 0;
let totalRounds = 5;
let processing = false;

// References
const startButton = document.querySelector('.start-btn');
const startSection = document.querySelector('.start-section');
const gameContentWrapper = document.querySelector('.game-content-wrapper');
const imagesChoicewrapper = document.querySelector('.choice-images-wrapper');
const resultOutputHeading = document.querySelector('.result-output');
const userImg = document.querySelector('.user-img')
const compImg = document.querySelector('.comp-img')
const userScoreSelector =  document.querySelector('#user-score');
const computerScoreSelector = document.querySelector('#computer-score');
const roundScoreSelector = document.querySelector('#round-number');
const playAgainBtnSelector = document.querySelector('#play-again');


// Methods

const checkGameCompletion = ()=>{
    if(totalRounds === rounds){
        playAgainBtnSelector.classList.toggle('invisible')
        resultOutputHeading.classList.toggle('invisible')
    }
}
const changeScore=(winner)=>{
    if(winner === 1){
        userScore +=1;
    }else if (winner == 2){
        compScore +=1;
    }
    if(winner !== undefined){
        rounds+=1;
    }
    userScoreSelector.innerText = userScore;
    computerScoreSelector.innerText = compScore;
    roundScoreSelector.innerText = rounds;
    checkGameCompletion()
    return null;

}
let generateResult = (userChoice)=>{
    const resultMsg = ['Its a draw','User Wins !','Computer Wins !']
    const choices = ['ROCK','PAPER','SCISSOR'];
    processing = true;
  
    setTimeout(()=>{
        const compChoiceIndex  = Math.round(Math.random() * 2)
        const userChoiceIndex = choices.indexOf(userChoice)
        let result = null;
        // 0 indicates draw, 1 indicates user won and 2 indicates computer won
        if(compChoiceIndex == userChoiceIndex){
            result = 0
        }
        else if(compChoiceIndex == choices.length -1 && userChoiceIndex == 0 ){
            result = 1
        }else if(userChoiceIndex == choices.length -1 && compChoiceIndex == 0){
            result = 2
        }
        else if(compChoiceIndex >userChoiceIndex ){
            result = 2
        }else{
            result = 1
        }
        changeScore(result)
        userImg.classList.toggle('generate-user-result');
        compImg.classList.toggle('generate-cpu-result');
        resultOutputHeading.innerText = resultMsg[result]
        processing = false;
     
    },[2000])

}


// Event Listeners

// Game start click
startButton.addEventListener('click',()=>{
    startButton.classList.toggle('invisible')
    startSection.classList.toggle('invisible')
    gameContentWrapper.classList.toggle('visible')
    gameContentWrapper.classList.toggle('game-content-wrapper-initial')
}) 


// Play again click
playAgainBtnSelector.addEventListener('click',()=>{
    // Resetting
    playAgainBtnSelector.classList.toggle('invisible')
    resultOutputHeading.innerText = ''
    resultOutputHeading.classList.toggle('invisible')
    userScore = 0;
    compScore = 0;
    rounds = 0;
    totalRounds = 5;
    changeScore()
})


// User option click
imagesChoicewrapper.addEventListener('click', (e)=>{
    let userSelection = e.target.parentElement.id;
    if(!processing){
        // Toggle animation
        userImg.classList.toggle('generate-user-result');
        compImg.classList.toggle('generate-cpu-result');
        generateResult(userSelection)
    }
  

})