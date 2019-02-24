var ball, level, ballSpeedX, ballSpeedY, ballPosX, ballPosY;


    window.addEventListener('deviceorientation', orientationChange);
    ball = document.querySelector('.ball');
    level = document.querySelector('.level');
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballPosX = ball.style.left;
    ballPosY = ball.style.bottom;


console.log(ballPosX);
        
function orientationChange(event) {
    console.log(event);

}

function moveBall() {
            
    setTimeout(moveBall, 1000/60);
}
moveBall();