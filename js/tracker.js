
import SongsList from './data.json' assert { type: "json" }
import { PlayList } from "./playlist.js";

export const DurationTracker = (()=>{

    let currentDuration = 0;
    let totalDuration = 0;
    let width = 0;
  
    const setState = (obj)=>{
        currentDuration = obj.currentDuration;
        totalDuration = obj.totalDuration;
        console.log(Math.round(obj.currentDuration/obj.totalDuration * 100))
        width = Math.round(obj.currentDuration/obj.totalDuration * 100);
        console.log("obj re",obj)
        render()
    }
  
    // Dom Query
    let progressInnerEl = document.querySelector('.progress-inner')
    
    
    const init = ()=>{
        render();
        listeners();
    }
    const render = ()=>{
        console.log("render @@@@")
        progressInnerEl.style.width = `${width}%`;
        // songNameMainEl.innerText = currentSongObj.name;
        // songImageEl.src= currentSongObj.coverArt;
        // totalSongsEl.innerText = PlayList.totalSongs + ' Songs';
        // playBtnMainEl.innerText = currentSong.paused ? 'Play' : 'Pause'
    }
    
    return {
        init,
        setState
    }
})()