import SongsList from './data.json' assert { type: "json" }
import { PlayInfo } from './playinfo.js';
export const PlayList = (()=>{


    let currentSongIndex = 0;
    let currentSongObj = SongsList[currentSongIndex];
    let currentSong = new Audio(SongsList[currentSongIndex].url);
    let totalSongs = SongsList.length;
    let isPlaying = !currentSong.paused;
    currentSong.addEventListener("loadeddata", function() {
        console.log("Audio data loaded");
        console.log("Audio duration: " + this.duration);
    });
    // Dom Query
    let playListEl = document.querySelector('.play-list');
    // currentSong.pau
    console.log("currentSong -->",currentSong);
    console.log("isPlaying -->",isPlaying)

    const init = ()=>{
        console.log("Playlist")
        render();
        listeners();
    }

    const playPauseToggle = ()=>{
        currentSong.paused ? currentSong.play() : currentSong.pause()
    }
    const render = ()=>{
        let toggleIcon = (index)=>{
            if(currentSongIndex == index){
                console.log("this is the song @@@@",index)
                return currentSong.paused ? 'fa-play' : 'fa-pause'
            }else{
                return 'fa-play'
            }
        }
        playListEl.innerHTML = ''
        // Render Song List;
        SongsList.map((song,index)=>{
            playListEl.innerHTML+= `
            <div class="play-list-item">
               <i data-index=${index} id='playToggle' class="fa-solid ${toggleIcon(index)} play-btn" style="color: #56c030;"></i>
                <div class="song-detail-container">
                    <div class="song-info">
                        <h4 class="song-name">${song.name}</h4>
                        <p class="song-author">${song.artist}</p>
                    </div>
                    <p class="song-duration">${song.duration}</p>
                </div>
             </div>
            `
        })
  
    }

   

    const listeners = ()=>{
        playListEl.addEventListener('click',(e)=>{
            if(e.target.id === 'playToggle'){
                // Changing song if required
                if(e.target.dataset.index !== currentSongIndex){
                    currentSong.pause()
                    currentSongIndex = e.target.dataset.index
                    currentSong = new Audio(SongsList[currentSongIndex].url);
                
                }
                currentSongObj = SongsList[currentSongIndex];
                console.log("currentSongObj -->",currentSongObj)
                // Setting song to start
                currentSong.currentTime = 0
                playPauseToggle()
                render()
                PlayInfo.setState({currentSong,currentSongIndex}) 
                console.log("444-",e.target.dataset.index)
                console.log("currentSong -->",currentSong)
            }
            console.log()
        })
    }

    return {
        init,
        playPauseToggle,
        render,
        currentSongIndex,
        totalSongs,
    }
})()