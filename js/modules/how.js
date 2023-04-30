import { Home } from "./home.js";
import { sound } from "../data/sound.js";
export const How = ( _=>{
    
    const $hangman = document.querySelector('.hangman');

    const init=()=>{
        render();
        listeners();

    }
    const render = ()=>{
        let markup = `
            <h1 class="hangman__title">Instructions</h1>
            <ul class="how">
                <li>Alright here is how you play! </li> 
                <li>When you start a game the game will automatically choose a random word</li> 
                <li>Your job is to guess the choosen word completely by guessing a letter at a time by clicking on the buttons</li> 
                <li>If you successfuly guess the word within 7 tries you win or else you lose </li> 
                <li>If you loose you will be hanged without no mercy 👻 </li> 
            </ul>
            <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }

    const listeners = ()=>{
        $hangman.addEventListener('click',(event)=>{
            // Main menu click
            if(event.target.matches('.hangman__trigger')){
                sound.click.play()
                Home.init()

            }
        })
    }



    return {
        init
    }

})()