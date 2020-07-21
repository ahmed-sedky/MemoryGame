var countDown =document.getElementById('countDown'),
    seconds =180;

function timeDown(){
    'use strict';
    var 
        hours= Math.floor(seconds/(60*60)),
        minutes =Math.floor(seconds/60),
        remSeconds = Math.floor(seconds % 60);
    if(minutes >= 60){
        minutes =minutes -60;
    }
    if(remSeconds <10){
        remSeconds = "0"+remSeconds;
    }
    if(minutes <10){
        minutes = "0"+minutes;
    }
    if(hours <10){
        hours = "0"+hours;
    }
    
    countDown.textContent = hours +":" +minutes +":" +remSeconds;
    if(seconds > 0){
        seconds =seconds -1;
    }else{
        clearInterval(count);
        countDown.textContent = "You lose!"
    }   
}

var count =setInterval(function(){
    'use strict';
    timeDown();
},1000);

document.getElementById('myBut').onclick =function(){
    document.getElementById('playAudio').play();
    timeDown();
    var myName =localStorage.getItem('player');
    console.log(myName);
    var yourName =prompt("what's your name?");
    
    if(yourName ==null || yourName == ""){
            document.querySelector('.name span').textContent = 'unknown';
    }else{
        document.querySelector('.name span').textContent = yourName;
        console.log('hey')
    }
    document.querySelector(".controls-button").remove();
    }
    localStorage.setItem('playerScore',document.querySelector('.tries span').textContent) ;

    

var blockContainer =document.querySelector(".memory-game-blocks"),
    duration = 1000,
    blocks = Array.from(blockContainer.children),
    orderRange = [...Array(blocks.length).keys()]; //Array(10) "by3mle 10 3naser fadden"

    





    shuffle(orderRange);
    //second method
    //orderRange = Array.from(Array(blocks.length).keys()) ; 

    //var testOrderRange = [6,3,5,19,17,15,13,14,10,2,7,9,1,8,20,18,16,4,17,0]
    //console.log(orderRange);
    blocks.forEach((block,index)=>{
        block.style.order = orderRange[index];
        block.addEventListener('click',function(){
            console.log('success');
            flipBlocked(block);
        });
    });

    function flipBlocked(selectedBlock){
        selectedBlock.classList.add('is-flipped');
        var allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
        if(allFlippedBlocks.length == 2){
            //console.log("you flipped 2 blocks")
            stopClicking();
            
            chickMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
        }
        var winingBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-matched'));
        if(winingBlocks.length == 20){
            console.log("You Win!");
            document.getElementById('win').style.display = 'block';
            document.getElementById('playAudio').pause();
            document.getElementById('wining').play();
        }
        if(countDown.textContent == "You lose!"){
            console.log("You lose!");
            document.getElementById('lose').style.display = 'block';
            document.getElementById('playAudio').pause();
            document.getElementById('losing').play();
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

    /*
    currentarray = [1,2,3,4,5,6,7,8,9,10]
    newArray = [0,1,2,3,4,5,6,7,8,9,10]
    (1) save current element in temp
    (2) current element = random element
    (3) random element = temp "stach"
    */
