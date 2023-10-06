const player = document.getElementById('player')
const video = document.querySelector('video') ;
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeBtn = document.getElementById('volume-btn')
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector ('.volume-bar');
const currentTimeEl = document.querySelector('.time-elapsed');
const durationEl = document.querySelector('.span-duration');
const playerSpeedEl = document.getElementById('player-speed')
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function pauseVideo(){
    playBtn.classList.replace('fa-pause','fa-play')
    video.pause()
}

function togglePlay(){
    if(playBtn.classList.contains('fa-play')){
        video.play()
        playBtn.classList.replace('fa-play','fa-pause')
    }else{
        pauseVideo()
    }
}


// Progress Bar ---------------------------------- //

function formatTime(time){
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    let seconds = (((time % 3600)  % 60)).toFixed(0).toString().padStart(2, '0');

    let formattedElapsedTime = ''
    if (hours > 0) {
        formattedElapsedTime = `${hours}:${minutes}:${seconds}`;
    } else if (minutes > 0) {
        formattedElapsedTime = `${minutes}:${seconds}`;
    } else {
        formattedElapsedTime = `0:${seconds}`;
    }
    return formattedElapsedTime
}

function updateDisplayTime(currentTime,duration){
    currentTimeEl.textContent = `${formatTime(currentTime)} /`
    durationEl.textContent = formatTime(duration)
    
}

function progressBarUpdate(){
    progressBar.style.width = `${(video.currentTime/video.duration * 100)}%`
    
    updateDisplayTime(video.currentTime,video.duration)
}

function seekVideo(e){
    let newTime = (e.offsetX / progressRange.offsetWidth);
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
    
}

// Volume Controls --------------------------- //

function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    volumeBar.style.width = `${volume * 100}px`;
    video.volume = volume;
}

function muteToggle(){
    if(volumeBtn.classList.contains('fa-volume-up')){
        volumeBtn.classList.replace('fa-volume-up','fa-volume-mute')
        video.muted = true
    }else{
        volumeBtn.classList.replace('fa-volume-mute','fa-volume-up')
        video.muted = false
    }
}

// Change Playback Speed -------------------- //

function changePlayerSpeed(e){
    video.playbackRate = e.target.value;
}


// Fullscreen ------------------------------- //

let fullScreen = false;

function fullScreenChange(){
    if(!fullScreen){
        fullScreen=true;
        openFullscreen(player)
    }else{
        fullScreen=false
        closeFullscreen()
    }
    // video.requestFullscreen()
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
/* Close fullscreen */
function closeFullscreen() {
if (document.exitFullscreen) {
    document.exitFullscreen();
} else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
}
}



// Event Listeners

playBtn.addEventListener('click',togglePlay)
video.addEventListener('click',togglePlay)
video.addEventListener('timeupdate',progressBarUpdate)
video.addEventListener('ended',pauseVideo)
progressRange.addEventListener('click',seekVideo)
volumeRange.addEventListener('click',changeVolume)
volumeBtn.addEventListener('click',muteToggle)
playerSpeedEl.addEventListener('change',changePlayerSpeed)
fullscreenBtn.addEventListener('click',fullScreenChange)
