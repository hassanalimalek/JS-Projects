let videoElement = document.getElementById('video');
let actionBtn = document.getElementById('action-btn');
let mediaStream = ''

// Start inital display media fetch
async function getDisplayMedia(){
    try{
       mediaStream =  await navigator.mediaDevices.getDisplayMedia();
       videoElement.srcObject = mediaStream;
       videoElement.onloadedmetadata = (()=>{
        videoElement.play();
       })
    }catch(error){
        console.log("error ===>",error)
    }

}
getDisplayMedia()


// Starting and stoping picture in picture
actionBtn.addEventListener('click',async ()=>{
    if(actionBtn.innerText === 'Start'){
        actionBtn.disable = true;
        await videoElement.requestPictureInPicture()
        actionBtn.innerText='Stop'
        actionBtn.disable = false;
    }else{
        // Resetting button text
        actionBtn.innerText='Start'
        // Exiting picture in picture
        document.exitPictureInPicture()
        // Stop all tracks in the media stream
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());
    }
})