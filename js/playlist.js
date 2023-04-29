import SongsList from './data.json' assert { type: "json" }
import { PlayInfo } from './playinfo.js';
import { DurationTracker } from './tracker.js';

export const PlayList = (()=>{
    let currentSongIndex = 0;
    let currentSong = new Audio(SongsList[currentSongIndex].url);
    let totalSongs = SongsList.length;
  
    // Dom Query
    let playListEl = document.querySelector('.play-list');
 
    const init = ()=>{
        render();
        listeners();
    }

    const playPauseToggle = ()=>{
        if(currentSong.paused === true){
            currentSong.play()
        }else{
            currentSong.pause()
        }
    }
    const render = ()=>{
        let toggleIcon = (index)=>{
            if(currentSongIndex == index){
                return currentSong.paused ? 'fa-play' : 'fa-pause'
            }else{
                return 'fa-play'
            }
        }
        let activeItemAndPlaying = (index)=>{
            return currentSongIndex == index &&  !currentSong.paused 
        }
        let activeItem = (index)=>{
            return currentSongIndex == index
        }
        let activeListItem = (index)=>{
            activeItemAndPlaying(index) ? 'play-list-item-active' :''
        }
        playListEl.innerHTML = ''
        // Render Song List;
        SongsList.map((song,index)=>{
            playListEl.innerHTML+= `
            <div class="play-list-item ${activeListItem(index)}">
                <div>
                   <i data-index=${index} id='playToggle' class="fa-solid ${toggleIcon(index)} play-btn" style="color: #56c030;"></i>
                   </br>
                   <i id='restart' class="fa-solid fa-reply ${activeItem(index) ? 'restart-btn' : 'restart-btn-hidden'} "></i>
                </div>
                <div class="song-detail-container">
                    <div class="song-info">
                        <h4 class="song-name">${song.name}</h4>
                        <p class="song-author grayed">${song.artist}</p>
                    </div>
                    <p class="song-duration">${song.duration}</p>
                </div>
             </div>
            `
        })
  
    }

   

    const listeners = ()=>{
        playListEl.addEventListener('click',(e)=>{
            // Play button toggle
            if(e.target.id === 'playToggle'){
                if(e.target.dataset.index == currentSongIndex){
                    playPauseToggle()
                   
                }
                // Changing song if required
                else{
                    currentSongIndex = e.target.dataset.index;
                    currentSong.src = SongsList[currentSongIndex].url;
                    playPauseToggle()
                }
                render()
                PlayInfo.setState({currentSong,currentSongIndex}) 
              
            }
            // Restart button click
            else if(e.target.id = 'restart'){
                currentSong.currentTime = 0;
            }

        })
        // Updating time duration
        currentSong.addEventListener("timeupdate", function() {
            DurationTracker.setState({
                currentDuration:currentSong.currentTime,
                totalDuration:currentSong.duration
            })
            
        });
      
    }

    return {
        init,
        playPauseToggle,
        render,
        currentSongIndex,
        totalSongs,
    }
})()