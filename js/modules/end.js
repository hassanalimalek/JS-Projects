export const End = ( _=>{

    const state= {
        chosenWord:null,
        winOrLose:null
    }

    const $hangman = document.querySelector('.hangman');

    const setState = obj =>{
        console.log("obje--->",obj)
        state.chosenWord = obj.chosenWord;
        state.winOrLose = obj.winOrLose;
        render();
    }
   
    const init=()=>{
        console.log("End @@@ @@@@@@")
        render();

    }
    const render = ()=>{
        console.log("render now @@@",state)
        let markup = `
        <h1 class="hangman__title">Game Over</h1>
        <p class="result">${state.winOrLose.toUpperCase()} !</br>
           The word is ${state.chosenWord.toUpperCase()}
        </p>
        <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }


    return {
        init,
        setState
    }

})()