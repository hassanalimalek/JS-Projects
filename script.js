// Elements and Forms
let dateEl = document.getElementById('date-picker');
let timeUIElements = document.getElementsByTagName('span');
let countdownForm = document.getElementById('countdownForm')
let completeInfo = document.getElementById('complete-info')
let countDownTitleEl = document.getElementById('countdown-title')

// Containers
let inputContainer = document.getElementById('input-container');
let countDownContainer = document.getElementById('countdown');
let finishContainer = document.getElementById('complete')

// Buttons
let resetButton = document.getElementById('countdown-reset-button')
let newCountdownBtn = document.getElementById('complete-button')


let timeInterval = '';
let countDownTitle = '';
let countDownTargetDate = Date;
// Setting current date as minimum date so previous date cant be selected
let date = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',date)

// Conversions to milliseconds
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;


// Updates UI as per the submitted task values
function updateUI(){
    countDownTitleEl.innerText=countDownTitle;
    timeInterval = setInterval(()=>{
        let targetDate = new Date(countDownTargetDate).getTime();
        let difference = targetDate - new Date().getTime();
        // Upon completion -> Clearing interval and showing the finish screen with the completion time
        if(difference < 1000){
            finishContainer.hidden = false;
            inputContainer.hidden = true;
            countDownContainer.hidden=true;
            const taskCompletedTime = new Date().toLocaleString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }).replace(/\//g, '-').replace(', ', ' ');
            completeInfo.innerText = `Completion Time : ${taskCompletedTime}`
            console.log(taskCompletedTime);
            clearInterval(timeInterval)
        }
        else{
        //  Calculating remaining time
        let targetDays = Math.floor(difference / days);
        let targetHours =  Math.floor((difference % days) / hours);
        let targetMinutes = Math.floor((difference % hours) / minutes);
        let targetSeconds = Math.floor((difference % minutes)/seconds);
        let timeUnits = [targetDays,targetHours,targetMinutes,targetSeconds];
        timeUnits.forEach((timeUnit,index)=>{
            timeUIElements[index].innerText = timeUnit
        })
        inputContainer.hidden = true
        countDownContainer.hidden=false
        }
    },1000)
   
}

// Starts Countdown
function startCountDown(e){
    e.preventDefault();
    countDownTitle = e.target[0].value;
    countDownTargetDate = e.target[1].value;
    updateUI()
}

// Reset Countdown
function reset(){
    clearInterval(timeInterval)
    countdownForm.reset();
    inputContainer.hidden = false;
    countDownContainer.hidden=true;
    finishContainer.hidden=true;
}

// Event Listeners
resetButton.addEventListener('click',reset)
newCountdownBtn.addEventListener('click',reset)
countdownForm.addEventListener('submit',startCountDown)


