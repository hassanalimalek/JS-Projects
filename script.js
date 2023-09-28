let imagesContainer = document.getElementById('images-container')
let loadingContainer = document.getElementById('loading-icon')
let errorContainer = document.getElementById('error-container');
let errorText = document.getElementById('error-text')

let ready = false;
let loadedImages = 0;
let count = 10;
let photosArray = []
// Unsplash API
let API_KEY = 'API_KEY'
let API = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}&orientation=landscape`


// Setting attributes in elements
function setAttributes(item,attributes){
    Object.keys(attributes).map(attr=>{
        item.setAttribute(attr, attributes[attr])
    })
}

// Checks if all images are loaded are not in the DOM
function imageLoad(){
    loadedImages++;
    if(loadedImages ===photosArray.length ){
        ready=true;
    }
}

// Displaying pictures 
function displayPictures(){
    loadedImages=[]
    photosArray.forEach(photo=>{
        // Creating anchor element
        let anchorElement = document.createElement('a');
        setAttributes(anchorElement,{
            target:'_blank',
            href:photo.links.html
        })
        // Creating image element to be added in the anchor element & setting attributes
        let imageElement = document.createElement('img')
        imageElement.onload = imageLoad
        setAttributes(imageElement,{
            src:photo.urls.regular,
            class:'splash-image'
        })
        anchorElement.appendChild(imageElement)
        imagesContainer.append(anchorElement)
    
    })
}

// Getting pictures from unsplash
async function getPictures(){
    ready=false;
    try{
        let resp = await fetch(API);
        let photos = await resp.json()
        if(photos.errors){
            throw photos.errors[0];
        }
        photosArray=photos;
        displayPictures()
        loadingContainer.classList.remove('loading-icon-initial')

    }catch(error){
        errorContainer.hidden = false;
        errorText.innerText = typeof error == 'string' ? error :  error?.message
    }finally{
        loadingContainer.hidden = true;
    }
}

// Fetching new images before reaching end of page
window.addEventListener("scroll", ()=>{
    if((window.innerHeight + window.pageYOffset > document.body.offsetHeight - 500)){
        loadingContainer.hidden = false
    }
    if((window.innerHeight + window.pageYOffset > document.body.offsetHeight - 500) && ready ===true){
        getPictures()
    }

});


getPictures()