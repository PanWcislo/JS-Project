let board,backgraund,backgraundCTX,boardCTX,timer

let gameStarted = false;    // deklaracja zmiennych
let time = 0
let TimeOut
let points = 0;

let ball = {    // deklaracja kuli
    x:0,
    y:0,
    radius:15,
    speedLimiter: 1
}

//tablica do przechowywania współrzędnych wygenerowanych dołków
let holeAmount = 25
let holes = []


let launcher = document.querySelector("#StartApp") // okno powitalne
launcher.addEventListener('click',()=>{Initializer()}); // zdarzenie kliknięca do przycisku Play

function Initializer(){  //zaladowanie/zainicjowanie gry
    document.querySelector("#start").style.display = "none" //status display dla okna powitalnego

    backgraund = document.querySelector('#background-board') // canvas z polem gry
    board = document.querySelector('#board') //canvas który jest interaktywny i zmienia sie w czasie 

    
    backgraund.width = window.innerWidth // dostosowanie rozmiarów
    backgraund.height = window.innerHeight // dostosowanie rozmiarów
    backgraundCTX = backgraund.getContext('2d') 

    board.width = window.innerWidth // dostosowanie rozmiarów
    board.height = window.innerHeight // dostosowanie rozmiarów
    boardCTX = board.getContext('2d')

    timer = document.querySelector('#timer')

    console.log("Game starting...")

    ball.x = board.width/2
    ball.y = board.height/2

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

    drawBall() // rysuj kule
    window.addEventListener('deviceorientation', (e) => {Move(e) })
    updateTimer() //aktualizacja czasu
    document.getElementById('Point').innerHTML = "Score: " + "0" // punktacja startowa
    document.getElementById('bestTime').innerHTML = "Best Time: " + T
}

function drawBall(){

    boardCTX.clearRect(0,0,board.width, board.height)
    boardCTX.beginPath()
    boardCTX.arc(ball.x, ball.y, ball.radius,0,2*Math.PI)
    boardCTX.fillStyle = "#DAA520" // kolor kuli
    boardCTX.fill() //wypełnij
}

function createHoles(){ //tworzenie dołków
    for(let i = 0; i < holeAmount; i++){

        let position = {x:0,y:0}

        position.x = Math.floor((Math.random()*(board.width - (2*ball.radius))) + ball.radius)
        position.y = Math.floor((Math.random()*(board.height - (2*ball.radius))) + ball.radius)

        if(distanceBetweenCenter(position,ball) <= 2 * ball.radius){ //dolek znajduje sie zbyt blisko piłki nastepuje ponowne losowanie 
            i--
        }else {
            holes.push({
                x:position.x,
                y:position.y
            })
        }
    }
}

function drawHoles(){ //rysowanie dołków
    if(holes.length == 0)
    createHoles()

    holes.forEach((a,b) => {
        backgraundCTX.beginPath()
        backgraundCTX.arc(a.x,a.y, ball.radius*1.5,0,2*Math.PI)
        if (b == 0){ // kolory dolków 
            backgraundCTX.fillStyle = "#FFF"   
        } else{
            backgraundCTX.fillStyle = "#000"
        }
        backgraundCTX.fill()
    })
}

function Move(e){
    if(gameStarted && (new Date().getTime() - time) < 120000){ // jesli czas gry mniejszy od 2 min
        //ponizszy kod zapobiega wychodzeniu kuli poza obszar planszy(board), dlatego minimalna wartosc to ball.radius, a maksymalna to width/height - ball.radius
        ball.x = Math.min(Math.max(parseInt(ball.x+(e.gamma/ball.speedLimiter)),ball.radius),board.width - ball.radius)
        ball.y = Math.min(Math.max(parseInt(ball.y+(e.beta/ball.speedLimiter)),ball.radius),board.height - ball.radius)

        holeHit()
        refreshBoard() // odswiez planszę
    }else if((new Date().getTime() - time) >= 120000){ // po upływie 2 minut gra konczy się
        loseGame() // wywolanie funkcji zakonczenia gry
    }
}

function holeHit(){
    let i = holes.findIndex((hole) => {
        return distanceBetweenCenter(hole,ball) <= 1.5 * ball.radius 
    })

    if(i === -1){} 
    else if(i === 0){ //jesli kula wjedzie na biały dolek dodaje punkt
        getPoint()
    }else 
        loseGame() // jesli wjedzie na czwerwony dolek konczy grę
}

function distanceBetweenCenter(obj1,obj2){
    return Math.sqrt(Math.pow(obj1.x-obj2.x,2)+Math.pow(obj1.y-obj2.y,2))
}

function refreshBoard(){ // resetuj plansze
    boardCTX.clearRect(0,0,board.width, board.height)
    drawBall()
}

function refreshBackground(){ // resetuj plansze
    backgraundCTX.clearRect(0,0,board.width,board.height)
    drawHoles()
}
function updateTimer(){ // aktualizacja czasu
    timeOut = setTimeout(()=>{
        let ms = new Date().getTime() - time
        let p = timer.children

        let s = parseInt(ms/1000)

        p[0].textContent = s < 0 ? "" : s
        p[1].textContent = ms-(s*1000)
        updateTimer()
    },70)
}

function getPoint(){ // dodaj punkt
    holes.shift() // usuniecie pierwszego dołka z tablicy po czym nastepuje przeskok do nastepnego
    refreshBackground() // reset planszy

    points++ // dodanie punktu o 1
    if(points >= 10){ winGame() } // jesli liczba punktów wynosi 10 nastepuje wygrana 
    document.getElementById('Point').innerHTML = "Score: " + points // przypisanie ilosci punktów w apce
}

function winGame(){
    alert("Wygrałeś. Gratulacje! Zajęło ci to: "+ ((new Date().getTime()-time) / 1000) + "sekund") // informacja o wygranej i czasie 
    let T = document.getElementById('bestTime').innerHTML = "Best Time: " + ((new Date().getTime()-time) / 1000)

    endGame()
}

function loseGame(){ // funkcja wyswietlajaca komunikat o przegranej grze
    if(gameStarted){
        alert("Przegrałeś. Spróbuj ponownie!")
        endGame()
    }
}

function resetGame(){ // koniec gry
    gameStarted = false // zmiana statusy na false

    document.querySelector("#start").style.display = "flex" // wyswietlenie ekranu powitalnego

    clearTimeout(timeOut) // wyczyszczenie wszystkich zmiennych do stanu poczatkowego
    time = 0
    points = 0
    holes.length = 0
    document.getElementById('Point').innerHTML = "Score: " + "0"
    document.getElementById('bestTime').innerHTML = "Best Time: " + "0"

    window.removeEventListener("deviceorientation", (e) => { handleMove(e) }) 

    boardCTX.clearRect(0,0,board.width,board.height)
    backgraundCTX.clearRect(0,0,board.width,board.height)

    console.log("... Game Ends")
}

function endGame(){ // koniec gry
    gameStarted = false // zmiana statusy na false

    document.querySelector("#start").style.display = "flex" // wyswietlenie ekranu powitalnego

    clearTimeout(timeOut) // wyczyszczenie wszystkich zmiennych do stanu poczatkowego
    time = 0
    points = 0
    holes.length = 0
    document.getElementById('Point').innerHTML = "Score: " + "0"
    document.getElementById('bestTime').innerHTML = "Best Time: " + T
    

    window.removeEventListener("deviceorientation", (e) => { handleMove(e) }) 

    boardCTX.clearRect(0,0,board.width,board.height)
    backgraundCTX.clearRect(0,0,board.width,board.height)

    console.log("... Game Ends")
}