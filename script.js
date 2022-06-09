import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElemnt = document.getElementById("player-score")
const computerScoreElemnt = document.getElementById("computer-score")

//score
let scoreComputer = 0
let scorePlayer = 0


let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
   computerPaddle.update(delta, ball.y)

   const hue =  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
   document.documentElement.style.setProperty("--hue", hue + delta * 0.01)


    if (isLose()) {
      handleLose()
    }
  }

  lastTime = time;  
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
  const rect = ball.rect()


  if (rect.right >= window.innerWidth) {
    playerScoreElemnt.textContent = parseInt(playerScoreElemnt.textContent) + 1

    //cuando tu metes gol
    scorePlayer += 1

    if (scorePlayer === 5){
      document.getElementById("player").style.display = "none"

      function tiempoPlayer(){
        scorePlayer = 0
        scoreComputer = 0
        computerScoreElemnt.textContent = scorePlayer
        document.getElementById("player").style.display = "flex"
        ball.reset()
      }
      setTimeout(tiempoPlayer,3000)
    }
//fin

  } else {
    computerScoreElemnt.textContent = parseInt(computerScoreElemnt.textContent) + 1

//aca empiesa cuando gana la compu

    scoreComputer += 1

    if (scoreComputer === 5){
      document.getElementById("cartelComputadora").style.display = "flex"

      function tiempoComputer(){
      scoreComputer = 0
      scorePlayer = 0
      computerScoreElemnt.textContent = scoreComputer     
      document.getElementById("cartelComputadora").style.display = "none"   
      ball.reset()
      }
      setTimeout(tiempoComputer,3000)
    }

//aca termina
  }


  ball.reset()
  computerPaddle.reset()
}


document.addEventListener("mousemove", e =>{
  playerPaddle.position = (e.y / window.innerHeight) * 100
})


window.requestAnimationFrame(update)