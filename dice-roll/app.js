const rollDiceBtn = document.querySelector('.dice__trigger');
const diceImg = document.querySelector('.dice__image')
const diceResultDiv = document.querySelector('.dice__result')


// Roll button listener
rollDiceBtn.addEventListener('click',()=>{
    diceResultDiv.classList.add('dice__animate')
    setTimeout(()=>{
        let random = Math.round(Math.random() * 5) + 1 ;
        diceImg.src = `./images/dice${random}.png`
        diceResultDiv.classList.remove('dice__animate')
    },[1000])
})