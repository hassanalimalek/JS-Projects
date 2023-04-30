import {sound} from '../data/sound.js';
import { Game } from './game.js';
import { How } from './how.js';
export const Home = ( _=>{
    const $hangman = document.querySelector('.hangman');

    console.log("Home @@@@@@")
    const init=()=>{
        console.log("Home @@@@@@")
        render();
        listener();

    }

    const render = ()=>{
        let markup = '';
        markup+= `
           <h1 class='hangman__title'>Hangman</h1>
           <button class='button start'>New Game</button>
           <button class='button instructions'>Instructions</button>
        `
        $hangman.innerHTML=markup;
    }
    const listener = ()=>{
        document.querySelector('.start').addEventListener('click',()=>{
            Game.init()
            sound.click.play();
        })
        document.querySelector('.instructions').addEventListener('click',()=>{
            How.init()
            sound.click.play();
        })
    }

    return {
        init
    }

})()