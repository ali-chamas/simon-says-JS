const startButton = document.getElementById('play');
const score=document.getElementById('high-score');
const level = document.getElementById('level');
const tiles = document.querySelectorAll('.tile')


let maxScore=0;
let currentScore=0;
if(window.localStorage.getItem('maxScore')){
    maxScore=parseInt(window.localStorage.getItem('maxScore'))
    score.innerHTML=maxScore
}
let order = [];
let userOrder=[]

//recursive function
 function activateTile(level){ 
    
    tiles[0].parentElement.classList.add('unclickable')
    if(level===0){
        //user turn
        tiles[0].parentElement.classList.remove('unclickable')
        checkOrder()
    }else{
    let activeTile=tiles[Math.floor(Math.random()*4)]
    activeTile.classList.remove('inactive')
    playAudio(activeTile)
    order.push(activeTile.getAttribute('data-tile'))
    
    setTimeout(function(){
        deactivateTile(activeTile)
        activateTile(level-1)
        
    },2000)
    
    }
}

function deactivateTile(activeTile){
    activeTile.classList.add('inactive')
}




function playAudio(activeTile){
    if(activeTile.getAttribute('data-tile')=='green'){
        new Audio('../sounds/green.mp3').play()
    }else if(activeTile.getAttribute('data-tile')=='red'){
        new Audio('../sounds/red.mp3').play()
    }else if(activeTile.getAttribute('data-tile')=='yellow'){
        new Audio('../sounds/yellow.mp3').play()
    }else if(activeTile.getAttribute('data-tile')=='blue'){
        new Audio('../sounds/blue.mp3').play()
    }
}



function startGame(){
    if(level.innerHTML>12){
        new Audio('../sounds/game-win.wav').play()
        alert('you won!')
        reset()
    }else{
        order=[]
        userOrder=[]
        goodChoice=false
        activateTile(level.innerHTML);
    }
}

startButton.addEventListener('click',function(){
    level.innerHTML=1;
    startGame()
})






let goodChoice = false;

for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', function (tile) {
        userOrder.push(tile.target.getAttribute('data-tile'));
        playAudio(tile.target); 

        setTimeout(function () {
        checkOrder(); 
        }, 500);
    });
    
}

function checkOrder() {
    
    for (let j = 0; j < userOrder.length; j++) {

        if (order[j] === userOrder[j]) {

            goodChoice = true;
            
        } else {
            new Audio('../sounds/wrong.mp3').play();
            endGame();
        }

    }

   
//if user selected the tiles in the right order, repeat by increasing level
    if (userOrder.length === order.length && goodChoice) {
         currentScore++;
        if(currentScore>=maxScore){
            maxScore=currentScore;
            window.localStorage.setItem('maxScore',String(maxScore))
            score.innerHTML=maxScore;
        }
        level.innerHTML = parseInt(level.innerHTML) + 1;
        startGame();
    }
    
}

function reset(){
    level.innerHTML=0;
    tiles[0].parentElement.classList.add('unclickable')
    order=[];
    userOrder=[]
    currentScore=0
    goodChoice=false;
}
    


function endGame(){
    reset()
    new Audio('../sounds/game-over.wav').play()
    
}




