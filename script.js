let quote = document.getElementsByClassName('quote')
let quoteText = document.getElementsByClassName('quote-text')
let author = document.getElementsByClassName('author')
let quoteWrapper = document.getElementsByClassName('quote-wrapper')
let loadingSpinner = document.getElementsByClassName('loading-spinner')
let newQuoteBtn = document.getElementById('newQuoteBtn')
let tweetBtn = document.getElementById('tweet-btn')

const getQuotes = async ()=>{
    let apiURL = 'https://type.fit/api/quotes';
    quoteWrapper[0].style.display='none';
    loadingSpinner[0].style.display='block';
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
        quoteWrapper[0].style.display='block';
        loadingSpinner[0].style.display='none';
    },500)
   
   
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