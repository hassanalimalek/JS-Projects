export const DurationTracker = (()=>{

    let currentDuration = 0;
    let totalDuration = 0;
    let width = 0;
  
    const setState = (obj)=>{
        currentDuration = obj.currentDuration;
        totalDuration = obj.totalDuration;
        width = Math.round(obj.currentDuration/obj.totalDuration * 100);
        render()
    }
  
    // Dom Query
    let progressInnerEl = document.querySelector('.progress-inner')
    
    
    const init = ()=>{
        render();
        listeners();
    }
    const render = ()=>{
        progressInnerEl.style.width = `${width}%`;
    }
    
    return {
        init,
        setState
    }
})()