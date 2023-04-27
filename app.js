import questions from './questions.json' assert { type: 'json' };

let questionWrapper = document.querySelector('.questions-wrapper')

// Add questions from json
questions.map((question)=>{
    let questionHTML = `<div class="question-wrapper">
    <div class="question">
      <h3>${question.question}?</h3>
      <i id="toggle-icon" name="toggle-icon" class="fa-solid fa-plus"></i>
    </div>
    <div class="answer">
      <p>
        ${question.answer}
      </p>
    </div>
    </div>`
    questionWrapper.innerHTML += questionHTML

})

// Toggle icon listener
questionWrapper.addEventListener('click',(event)=>{
    // Toggling answer visiblity
    event.target.parentElement.nextElementSibling.classList.toggle('answer-visible')
    // Toggling icon
    if(event.target.id === 'toggle-icon'){
       event.target.classList.toggle('fa-plus')
       event.target.classList.toggle('fa-minus')
    }else{
        event.target.nextElementSibling.classList.toggle('fa-plus');
        event.target.nextElementSibling.classList.toggle('fa-minus')
    }
})



