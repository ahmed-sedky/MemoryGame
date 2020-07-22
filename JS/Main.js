//count Down
var countDown =document.getElementById('countDown'),
    seconds =120;

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

var count =setInterval(function(){
    'use strict';
    timeDown();
},1000);

//get the data from the local storage

var myName1 =localStorage.getItem('player-name1'),
    myScore1 =localStorage.getItem('player-score1'),
    myName2 =localStorage.getItem('player-name2'),
    myScore2 =localStorage.getItem('player-score2'),
    myName3 =localStorage.getItem('player-name3'),
    myScore3 =localStorage.getItem('player-score3'),
    myName4 =localStorage.getItem('player-name4'),
    myScore4 =localStorage.getItem('player-score4'),
    myName5 =localStorage.getItem('player-name5'),
    myScore5 =localStorage.getItem('player-score5');

    
    if (myScore1 == null){
        myScore1 = "50";
    }
    if (myScore2 == null){
        myScore2 = "50";
    } if (myScore3 == null){
        myScore3 = "50";
    } if (myScore4 == null){
        myScore4 = "50";
    } if (myScore5 == null){
        myScore5 = "50";
    }
    myScore = myScore1 + " " + myScore2 + " " + myScore3 + " " + myScore4 + " " + myScore5;
    scoreArray = myScore.split(" ");
    scoreArray.sort(function(a, b){return a-b});
    myScore1 = scoreArray[0];
    myScore2 = scoreArray[1];
    myScore3 = scoreArray[2];
    myScore4 = scoreArray[3];
    myScore5 = scoreArray[4];

    var myPlayer1 = new Object();
        myPlayer1.name =myName1;
        myPlayer1.score =myScore1;
    var myPlayer2 = new Object();
        myPlayer2.name =myName2;
        myPlayer2.score =myScore2;
    var myPlayer3 = new Object();
        myPlayer3.name =myName3;
        myPlayer3.score =myScore3;
    var myPlayer4 = new Object();
        myPlayer4.name =myName4;
        myPlayer4.score =myScore4;
    var myPlayer5 = new Object();
        myPlayer5.name =myName5;
        myPlayer5.score =myScore5;

    console.log("score : " +scoreArray)


    document.getElementById('name1').textContent = myPlayer1.name;
    document.getElementById('score1').textContent = myPlayer1.score;
    document.getElementById('name2').textContent = myPlayer2.name;
    document.getElementById('score2').textContent = myPlayer2.score;
    document.getElementById('name3').textContent = myPlayer3.name;
    document.getElementById('score3').textContent = myPlayer3.score;
    document.getElementById('name4').textContent = myPlayer4.name;
    document.getElementById('score4').textContent = myPlayer4.score;
    document.getElementById('name5').textContent = myPlayer5.name;
    document.getElementById('score5').textContent = myPlayer5.score;
console.log(myName1 + myName2 +myName3 +myName4 +myName5);
console.log(myScore1 + " "+ myScore2 + " "+myScore3+" " +myScore4+" " +myScore5);

// Start Button

document.getElementById('myBut').onclick =function(){
    //turn on the audio Game
    document.getElementById('playAudio').play();
    // call the timer function
    timeDown();
    
    //put the player name in the info
    var yourName =prompt("what's your name?");
    
    if(yourName ==null || yourName == ""){
            document.querySelector('.name span').textContent = 'unknown';
    }else{
        document.querySelector('.name span').textContent = yourName;
    }
    document.querySelector(".controls-button").remove();

    


    if(localStorage.getItem('player-name1') == "" ){
        localStorage.setItem('player-name1', document.querySelector('.name span').textContent) ;
    }
    else if( localStorage.getItem('player-name1') != ""&&  localStorage.getItem('player-name2') == ""){
        localStorage.setItem('player-name2', document.querySelector('.name span').textContent) ;
    } else if(localStorage.getItem('player-name1') != ""&&  localStorage.getItem('player-name2') != "" && localStorage.getItem('player-name3') == ""){
        localStorage.setItem('player-name3', document.querySelector('.name span').textContent) ;
    }
    else if(localStorage.getItem('player-name1') != ""&&  localStorage.getItem('player-name2') != "" && localStorage.getItem('player-name3') != "" && localStorage.getItem('player-name4') == ""){
        localStorage.setItem('player-name4', document.querySelector('.name span').textContent) ;
    }
    else {
        localStorage.setItem('player-name5', document.querySelector('.name span').textContent) ;
    }
    
    console.log("player1 is : " +localStorage.getItem('player-name1'));
    console.log("player2 is : " +localStorage.getItem('player-name2'));
    console.log("player3 is : " +localStorage.getItem('player-name3'));
    console.log("player4 is : " +localStorage.getItem('player-name4'));
    console.log("player5 is :" +localStorage.getItem('player-name5'));

    }
    


var blockContainer =document.querySelector(".memory-game-blocks"),
    duration = 1000,
    //make an array from the blocks
    blocks = Array.from(blockContainer.children),
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
        block.addEventListener('click',function(){
            console.log('success');
            flipBlocked(block);
        });
    });

    function flipBlocked(selectedBlock){
        //add class is-fliped to flip the block 
        selectedBlock.classList.add('is-flipped');
        // know which block is flipped by the player
        var allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

        //check if the player flipped 2 cards
        if(allFlippedBlocks.length == 2){
            //console.log("you flipped 2 blocks")
            stopClicking();
            
            chickMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
        }
        var winingBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-matched'));
        if(winingBlocks.length == 20){
            console.log("You Win!");
            document.getElementById('win').style.display = 'block';
            reset(winingBlocks);
            document.getElementById('playAudio').pause();
            document.getElementById('wining').play();
            
            if(localStorage.getItem('player-score1') == "" ){
                localStorage.setItem('player-score1', document.querySelector('.tries span').textContent) ;
            }
            else if(localStorage.getItem('player-score2') == ""){
                localStorage.setItem('player-score2', document.querySelector('.tries span').textContent) ;
            } else if(localStorage.getItem('player-score3') == ""){
                localStorage.setItem('player-score3', document.querySelector('.tries span').textContent) ;
            }
            else if(localStorage.getItem('player-score4') == ""){
                localStorage.setItem('player-score4', document.querySelector('.tries span').textContent) ;
            }
            else {
                localStorage.setItem('player-score5', document.querySelector('.tries span').textContent) ;
            }
        }

        if(countDown.textContent == "00:00:10"){
            console.log('clock')
            document.getElementById('playAudio').pause();
            document.getElementById('clock').play();
        }
        if(countDown.textContent == "00:00:04"){
            console.log('Fclock')
            document.getElementById('clock').pause();
            document.getElementById('fast-clock').play();
        }

        if(countDown.textContent == "You lose!"){
            console.log("You lose!");
            document.getElementById('lose').style.display = 'block';
            document.getElementById('playAudio').pause();
            document.getElementById('losing').play();
        }
        
    }
    function reset(winBlocks){
        document.getElementById('win').onclick =function(){
            document.getElementById('win').style.display = 'none';
            //score to the leaderboard
            myScore3 = document.querySelector('.tries span').textContent;
            shuffle(orderRange);
            myScore = myScore1 + " " + myScore2 + " " + myScore3 + " " + myScore4 + " " + myScore5;
            var scoreArray = myScore.split(" ");
            scoreArray.sort(function(a,b){return a-b})
            myScore1 = scoreArray[0];
            myScore2 = scoreArray[1];
            myScore3 = scoreArray[2];
            myScore4 = scoreArray[3];
            myScore5 = scoreArray[4];
            console.log(myScore1+" "+myScore2 + " " + myScore3 + " " +myScore4 + " "+myScore5);

            var myPlayer1 = new Object();
                myPlayer1.name =myName1;
                myPlayer1.score =myScore1;
            var myPlayer2 = new Object();
                myPlayer2.name =myName2;
                myPlayer2.score =myScore2;
            var myPlayer3 = new Object();
                myPlayer3.name =myName3;
                myPlayer3.score =myScore3;
            var myPlayer4 = new Object();
                myPlayer4.name =myName4;
                myPlayer4.score =myScore4;
            var myPlayer5 = new Object();
                myPlayer5.name =myName5;
                myPlayer5.score =myScore5;
            document.getElementById('score1').textContent = myPlayer1.score;
            document.getElementById('score2').textContent = myPlayer2.score;
            document.getElementById('score3').textContent = myPlayer3.score;
            document.getElementById('score4').textContent = myPlayer4.score;
            document.getElementById('score5').textContent = myPlayer5.score;


            var yourName =prompt("what's your name?");
    
            if(yourName ==null || yourName == ""){
                    document.querySelector('.name span').textContent = 'unknown';
                    myPlayer5.name= document.querySelector('.name span').textContent ;
                    document.getElementById('name5').textContent = myPlayer5.name;
            }else{
                document.querySelector('.name span').textContent = yourName;
                myPlayer5.name = document.querySelector('.name span').textContent;
                document.getElementById('name5').textContent = myPlayer5.name;
            }
            document.querySelector('.tries span').textContent = 0; 
            document.getElementById('wining').pause();
            seconds = 120;
            document.getElementById('playAudio').play();
            console.log("you clicked 'you win'");
            for(var i =0 ;i <winBlocks.length ; i++){
                winBlocks[i].classList.remove('is-matched');
            }
        }
    }

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