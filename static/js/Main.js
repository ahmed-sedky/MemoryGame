//count Down
var countDown =document.getElementById('countDown'),
    mode = document.getElementById('mode').value;
    if (mode == 'easy'){
        seconds =180;
    }else if(mode == 'medium'){
        seconds =120;
    }else if(mode == 'hard'){
        seconds = 100;
    }else{
        seconds =250;
    }

function timeDown(){
    'use strict';
    var 
        hours= Math.floor(seconds/(60*60)),
        minutes =Math.floor(seconds/60),
        remSeconds = Math.floor(seconds % 60);
    if(minutes >= 60){
        minutes = minutes -60;
    }
    if(remSeconds <10){
        remSeconds = "0" + remSeconds;
    }
    if(minutes <10){
        minutes = "0" + minutes;
    }
    if(hours <10){
        hours = "0" + hours;
    }
    
    countDown.textContent = hours +":" +minutes +":" +remSeconds;
    if(seconds > 0){
        seconds = seconds -1;
    }else{
        clearInterval(count);
        countDown.textContent = "You lose!"
    }   
}



//get the data from the local storage
console.log(seconds);

// Start Button

document.getElementById('myBut').addEventListener('click',function(){
    //turn on the audio Game
    document.getElementById('playAudio').play();
    // call the timer function
    timeDown();
    var count =setInterval(function(){
        'use strict';
        timeDown();
    },1000);
    document.querySelector(".controls-button").remove();
});


var blockContainer =document.querySelector(".memory-game-blocks"),
    blockBox = document.querySelectorAll(".game-block"),
    blockB = document.querySelectorAll(".col"),
    duration = 1000,
    //make an array from the blocks
    blocks = Array.from(blockB),
    blockBox2 = Array.from(blockBox),
    //get the key of an array its length is from number of the blocks and put them in anew array
    orderRange = [...Array(blocks.length).keys()]; //Array(10) "by3mle 10 3naser fadden"

    // change the order of an array
    shuffle(orderRange);
    //second method
    //orderRange = Array.from(Array(blocks.length).keys()) ; 

    function shuffle(array){
        var current = array.length,
            temp,
            random;
        while(current > 0){
            random = Math.floor(Math.random() * current);
            current--;
            //console.log(random);
            temp = array[current];
            array[current] = array[random];
            array[random] = temp;
        }
    }
    //var testOrderRange = [6,3,5,19,17,15,13,14,10,2,7,9,1,8,20,18,16,4,17,0]
    //console.log(orderRange);

    // change the order of the block "facility in flex box"
    blocks.forEach((block,index)=>{ //foreach(element , length) =>function)
        block.style.order = orderRange[index];
        
    });
    blockBox.forEach((block,index)=>{ //foreach(element , length) =>function)
        
        block.addEventListener('click',function(){
            console.log(block);
            flipBlocked(block);
        });
    });

    function flipBlocked(selectedBlock){
        //add class is-fliped to flip the block 
        selectedBlock.classList.add('is-flipped');
        // know which block is flipped by the player
        var allFlippedBlocks = blockBox2.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

        //check if the player flipped 2 cards
        if(allFlippedBlocks.length == 2){
            //console.log("you flipped 2 blocks")
            stopClicking();
            
            chickMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
        }
        var winingBlocks = blockBox2.filter(flippedBlock => flippedBlock.classList.contains('is-matched'));
        if (mode == 'easy'){
            succsisve_blocks =18;
        }else if(mode == 'medium'){
            succsisve_blocks =24;
        }else if(mode == 'hard'){
            succsisve_blocks =30;
        }else {
            succsisve_blocks = 36;
        }
        if(winingBlocks.length == succsisve_blocks){
            console.log("You Win!");
            document.getElementById('win').style.display = 'block';
            // reset(winingBlocks);
            document.getElementById('playAudio').pause();
            document.getElementById('wining').play();
            var score = document.getElementById('score3'),
                minutes =document.getElementById('minutes3'),
                submit =document.getElementById('submit');
                score.value = document.querySelector('.tries span').textContent;
                minutes.value = countDown.textContent;
                console.log(submit.value ,minutes.value);
                document.getElementById('navbar').style.zIndex = 5;
                document.getElementById('win2').addEventListener('click',function(){
                    submit.click();
                    console.log(score.value ,minutes.value);
                });
        }

        if(seconds  <= 10){
            console.log('clock')
            document.getElementById('playAudio').pause();
            document.getElementById('clock').play();
        }
        if(seconds <= 4){
            console.log('Fclock')
            document.getElementById('clock').pause();
            document.getElementById('fast-clock').play();
        }
        if(seconds<=1){
            countDown.textContent = "You lose!"
        }
        if(countDown.textContent == "You lose!"){
            console.log("You lose!");
            document.getElementById('lose').style.display = 'block';
            document.getElementById('playAudio').pause();
            document.getElementById('losing').play();
            document.getElementById('navbar').style.zIndex = 5;
        }
        
    }
    // function reset(winBlocks){
    //     document.getElementById('win').onclick =function(){
    //         document.getElementById('win').style.display = 'none';
    //         //score to the leaderboard
    //         myScore3 = document.querySelector('.tries span').textContent;
    //         shuffle(orderRange);
            
    //         document.querySelector('.tries span').textContent = 0; 
    //         document.getElementById('wining').pause();
    //         seconds = 120;
    //         document.getElementById('playAudio').play();
    //         console.log("you clicked 'you win'");
    //         for(var i =0 ;i <winBlocks.length ; i++){
    //             winBlocks[i].classList.remove('is-matched');
    //         }
    //     }
    // }

    function stopClicking(){
        blockContainer.classList.add('no-clicking');
        setTimeout(() =>{ //Es6
            blockContainer.classList.remove('no-clicking');
        },duration);
    }

    function chickMatchedBlocks(firstBlock ,secondBlock){
        var tries =document.querySelector('.tries span');
        if (firstBlock.dataset.technology ==secondBlock.dataset.technology){
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            firstBlock.classList.add('is-matched');
            secondBlock.classList.add('is-matched');
            document.getElementById('success').play();
        }else{
            tries.textContent = parseInt(tries.textContent) + 1;
            //document.getElementById('lose').play();
            setTimeout (()=>{
                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');
            },duration);
        }
    }


    /*
    currentarray = [1,2,3,4,5,6,7,8,9,10]
    newArray = [0,1,2,3,4,5,6,7,8,9,10]
    (1) save current element in temp
    (2) current element = random element
    (3) random element = temp "stach"
    */


    window.addEventListener("resize", resizeCanvas, false);
    window.addEventListener("DOMContentLoaded", onLoad, false);
    
    window.requestAnimationFrame = 
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function (callback) {
            window.setTimeout(callback, 1000/60);
        };
    
    var canvas, ctx, w, h, particles = [], probability = 0.04,
        xPoint, yPoint;
    
    
    
    
    
    function onLoad() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        resizeCanvas();
        
        window.requestAnimationFrame(updateWorld);
    } 
    
    function resizeCanvas() {
        if (!!canvas) {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
    } 
    
    function updateWorld() {
        update();
        paint();
        window.requestAnimationFrame(updateWorld);
    } 
    
    function update() {
        if (particles.length < 500 && Math.random() < probability) {
            createFirework();
        }
        var alive = [];
        for (var i=0; i<particles.length; i++) {
            if (particles[i].move()) {
                alive.push(particles[i]);
            }
        }
        particles = alive;
    } 
    
    function paint() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (var i=0; i<particles.length; i++) {
            particles[i].draw(ctx);
        }
    } 
    
    function createFirework() {
        xPoint = Math.random()*(w-200)+100;
        yPoint = Math.random()*(h-200)+100;
        var nFire = Math.random()*50+100;
        var c = "rgb("+(~~(Math.random()*200+55))+","
            +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
        for (var i=0; i<nFire; i++) {
            var particle = new Particle();
            particle.color = c;
            var vy = Math.sqrt(25-particle.vx*particle.vx);
            if (Math.abs(particle.vy) > vy) {
                particle.vy = particle.vy>0 ? vy: -vy;
            }
            particles.push(particle);
        }
    } 
    
    function Particle() {
        this.w = this.h = Math.random()*4+1;
        
        this.x = xPoint-this.w/2;
        this.y = yPoint-this.h/2;
        
        this.vx = (Math.random()-0.5)*10;
        this.vy = (Math.random()-0.5)*10;
        
        this.alpha = Math.random()*.5+.5;
        
        this.color;
    } 
    
    Particle.prototype = {
        gravity: 0.05,
        move: function () {
            this.x += this.vx;
            this.vy += this.gravity;
            this.y += this.vy;
            this.alpha -= 0.01;
            if (this.x <= -this.w || this.x >= screen.width ||
                this.y >= screen.height ||
                this.alpha <= 0) {
                    return false;
            }
            return true;
        },
        draw: function (c) {
            c.save();
            c.beginPath();
            
            c.translate(this.x+this.w/2, this.y+this.h/2);
            c.arc(0, 0, this.w, 0, Math.PI*2);
            c.fillStyle = this.color;
            c.globalAlpha = this.alpha;
            
            c.closePath();
            c.fill();
            c.restore();
        }
    } 

