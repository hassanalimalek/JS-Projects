import { Home } from "./home.js";
import { sound } from "../data/sound.js";
import { End } from "./end.js";
import { Board } from "./board.js";

export const Game = ( _=>{
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const words = ['dog','cat','bat','elephant','food'];
    let lives;
    let chosenWord;
    let guessingWord;
    let guesses;

    //Query dom
    const $hangman = document.querySelector('.hangman')

    const init=()=>{
        // 1. Choose a guessing word
        chosenWord = chooseWord();
        // 2. Build out guessing word to render
        guessingWord = Array(chosenWord.length).fill('_')
        
        guesses = [];
        lives= 7;
        // 3. Show initial screen
        showInitPage()

        listeners();
        // Setting up the canvas board
        Board.init()

    }

    const showInitPage = ()=>{
        let markup =`
            <p class='hangman__stats'>Lives <span class='hangman__lives'>${lives}</span>
            </p>
            <h1 class ='hangman__title'>Hangman </h1>
            <canvas class='hangman__board' height='155px'></canvas>
            <div class='hangman__word'>${guessingWord.join("")}</div>
            <p class='hangman__instructions'>
                Pick a letter below to guess the whole word
            </p>
            <ul class='hangman__letters'>
                ${createletters()}
            </ul>
            <button class='button hangman__trigger'>Main Menu</button>
        
        `;
        $hangman.innerHTML=markup;
    
    }
    const chooseWord = ()=>{
        return words[Math.floor(Math.random() * words.length)]
    }
    const createletters = ()=>{
        let markup = ``;
        letters.forEach(letter=>{
            const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' :''
            markup += `
                <li class='hangman__letter ${isActive}'>${letter}</li>
            `
        })
        return markup;
    }

    const listeners = ()=>{
        $hangman.addEventListener('click',(event)=>{
            // letter click
            if(event.target.matches('.hangman__letter')){
                sound.click.play()
                check(event.target.innerHTML)
                
            }
            // Main menu click
            if(event.target.matches('.hangman__trigger')){
                sound.click.play()
                Home.init()

            }
        })
    }

    const isAlreadyTaken = (letter)=>{
        return guesses.includes(letter);
    }

    const check = (guess)=>{
        if(isAlreadyTaken(guess)) return;

        guesses.push(guess);
        // check if guess exists in chosenword
        if(chosenWord.includes(guess)){
            // Update the guessing word
            updateGuessingWord(guess);
       
        }else{
            lives--;
            Board.setLives(lives);
            // render the board accordingly
        }
        render();

        isGameOver();
    }

    const hasWon  = _ =>guessingWord.join('') === chosenWord;
    const hasLost = _ => lives <=0;
    const isGameOver = ()=>{

        if(hasWon()){
            // alert("You have won")
            sound.win.play();
            End.setState({
                winOrLose:'Win',
                chosenWord
            })
        }
        if(hasLost()){
            // alert("You have lost")
            sound.lose.play();
            End.setState({
                winOrLose:'Loose',
                chosenWord
            })
        }
    }

    const updateGuessingWord = (letter)=>{

        chosenWord.split('').forEach((elem,index)=>{
            if(elem === letter){
                guessingWord[index] = elem;
            }
        })
    
    }
    const render = ()=>{
        document.querySelector('.hangman__lives').innerHTML = lives;
        document.querySelector('.hangman__word').innerHTML = guessingWord.join("");
        document.querySelector(".hangman__letters").innerHTML = createletters();
    }


    return {
        init
    }

})()