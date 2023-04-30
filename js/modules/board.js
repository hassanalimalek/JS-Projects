export const Board = ( _=>{

   let livesLeft = null;
   let canvas;
   let context;
    // Canvas hangman drawings
    const head = _=>{
    
        context.beginPath();
        context.arc(60, 25, 10, 0, 2 * Math.PI);
        context.stroke();
    }
    const line1= _ => draw(0,150,150,150);
    const line2= _ => draw(10,0,10,300);
    const line3= _ => draw(0,5,70,5);
    const rope= _ => draw(60,5,60,15);
    const torso= _ => draw(60,36,60,70);
    const rightArm= _ => draw(60,46,100,50);
    const leftArm= _ => draw(60,46,20,50);
    const rightLeg= _ => draw(60,70,100,100);
    const leftLeg= _ => draw(60,70,20,100);


   // Orders in reverse as we render them based on lives remaining, 6 means render rope, 5 means render head and so  
   const parts = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    rope
   ]
   const setLives = lives=>{
     livesLeft = lives
     render();
   }
    const init=()=>{
        canvas = document.querySelector('.hangman__board');
        context = canvas.getContext('2d')
        context.lineWidth = '2';
        context.strokeStyle = "white";
        // Base Lines
        line1()
        line2();
        line3()
    }

    const render = _=>{
        parts[livesLeft]();
    }
    const draw = (startX,startY,endX,endY)=>{
        context.moveTo(startX,startY);
        context.lineTo(endX,endY);
        context.stroke();
    }
    
    return {
        init,
        setLives
    }

})()