let board,backgraundCTX,boardCTX,timer

let gameStarted = false;    // deklaracja zmiennych
let time = 0
let TimeOut
let point = 0;

let ball = {    // deklaracja kuli
    x:0,
    y:0,
    radius:20,
    speedLimiter: 4
}

//tablica do przechowywania współrzędnych wygenerowanych dołków
let holeAmount = 10
let holes = []


let launcher = document.querySelector("#StartApp") // okno powitalne
launcher.addEventListener('click',()=>{Initializer()}); // zdarzenie kliknięca do przycisku Play

function Initializer(){  //zaladowanie/zainicjowanie gry
    document.querySelector("#start").style.display = "none" //status display dla okna powitalnego

    let backgraund = document.querySelector('#background-board') // canvas z polem gry
    board = document.querySelector('#board') //canvas który jest interaktywny i zmienia sie w czasie 

    backgraund.width = window.innerWidth // dostosowanie rozmiarów do urządzenia
    backgraund.height = window.innerHeight // dostosowanie rozmiarów do urządzenia
    backgraundCTX = backgraund.getContext('2d') 

    timer = document.querySelector('#timer')

    console.log("Game starting...")

    ball.x = backgraund.width/2
    ball.y = backgraund.height/2

    if(window.DeviceOrientationEvent) startGame()
    else {
        alert("Controls not supported!")
        return;
    }
}

function startGame(){
    gameStarted = true
    drawHoles()

    time = new Date().getTime()

    drawBall();
    window.addEventListener('deviceorientation', (e) => {handleMove(e) })
    updateTimer();
}

function drawBall(){

}