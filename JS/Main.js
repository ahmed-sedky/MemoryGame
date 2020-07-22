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
var myName =localStorage.getItem('player-name'),
    myScore =localStorage.getItem('player-score');
/*
var myOldScore = ["100"],
    myScore = [],
    myOldName = ["unknown"],
    myName = [];

    for(var i = 1 ; i < 100 ;i++){
        if(myOldScore.length == i){
            myScore.unshift(localStorage.getItem('player-score'));
        }
        if(myOldName.length == i){
            myName.unshift(localStorage.getItem('player-name'));
        }
    }
    
    */

    document.getElementById('name1').textContent = myName;
    document.getElementById('score1').textContent = myScore;
console.log(myName);
console.log(myScore);

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
    localStorage.setItem('player-name', document.querySelector('.name span').textContent) ;
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
            localStorage.setItem('player-score', document.querySelector('.tries span').textContent ) ;
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
            document.getElementById('score1').textContent = document.querySelector('.tries span').textContent;
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
