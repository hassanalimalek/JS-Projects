
import SongsList from './data.json' assert { type: "json" }
import { PlayList } from "./playlist.js";

export const PlayInfo = (()=>{

    let currentSongIndex = 0;
    let currentSong = new Audio(SongsList[currentSongIndex].url); 
    let currentSongObj = SongsList[currentSongIndex];

    const setState = (obj)=>{
        currentSong = obj.currentSong;
        currentSongIndex = obj.currentSongIndex;
        currentSongObj = SongsList[currentSongIndex];
        render()
    }
  
    // Dom Query
    let songNameMainEl = document.querySelector('.song-name-main')
    let playBtnMainEl = document.querySelector('.play-btn-main');
    let totalSongsEl = document.querySelector('.total-songs')
    let songImageEl = document.querySelector('.song-image')
    
    const init = ()=>{
        render();
        listeners();
    }
    const render = ()=>{
        songNameMainEl.innerText = currentSongObj.name;
        songImageEl.src= currentSongObj.coverArt;
        totalSongsEl.innerText = PlayList.totalSongs + ' Songs';
        playBtnMainEl.innerText = currentSong.paused ? 'Play' : 'Pause'
    }
    const listeners = ()=>{
        playBtnMainEl.addEventListener('click',()=>{
            PlayList.playPauseToggle()
            PlayList.render()
            render()
        })
    }


    return {
        init,
        setState
    }
})()