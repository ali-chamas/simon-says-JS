const startButton = document.getElementById('play');
const score=document.getElementById('high-score');
const level = document.getElementById('level');
const tiles = document.querySelectorAll('.tile')



let turn = 'computer';
let order = [];


 function activateTile(level){ 
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
        
    },3000)
    
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
    
    activateTile(level.innerHTML)
   
}

startButton.addEventListener('click',function(){
    level.innerHTML=1;
    startGame()
})

let gameOver=false;
let gameWon=false;


