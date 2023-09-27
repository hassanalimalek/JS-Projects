let quote = document.getElementsByClassName('quote')
let quoteText = document.getElementsByClassName('quote-text')
let author = document.getElementsByClassName('author')
let quoteWrapper = document.getElementsByClassName('quote-wrapper')
let loadingSpinner = document.getElementsByClassName('loading-spinner')
let newQuoteBtn = document.getElementById('newQuoteBtn')
let tweetBtn = document.getElementById('tweet-btn')

// Fetches quotes and updates the DOM
const getQuotes = async ()=>{
    let apiURL = 'https://type.fit/api/quotes';
    showLoader()
    try{

        let resp = await fetch(apiURL);
        let data = await resp.json();
        let randomNum = Math.floor(Math.random() * data.length)
        let quoteData = data[randomNum];

        quote[0].innerHTML = quoteData.text;
        author[0].innerHTML = quoteData.author ? quoteData.author.split(',')[0] : 'Unknown';
        if(quoteData.text.length > 50){
            quoteText[0].classList.toggle('long-quote')
        }

    } catch(error){
        console.log("error -->",error)
    }
    setTimeout(()=>{
      hideLoder()
    },500)
   
   
}

// Shows loading spinner
let showLoader = ()=>{
    quoteWrapper[0].style.display='none';
    loadingSpinner[0].style.display='block';
}

// Hides loading spinner
let hideLoder = ()=>{
    quoteWrapper[0].style.display='block';
    loadingSpinner[0].style.display='none';
}

// Tweet quote
tweetBtn.addEventListener('click',()=>{
    window.open(`https://twitter.com/intent/tweet?text=${quote[0].innerText}`,'_blank')
})

// Fetch new quotes click
newQuoteBtn.addEventListener('click',()=>{
    getQuotes()
})

getQuotes()