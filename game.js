
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let blackHoleRotation = 0;
let angle = 0;
let score = 0;
// Load images
const blackHoleImage = new Image();
blackHoleImage.src = 'blackhole.png';

const winHoleImage = new Image();
winHoleImage.src = 'winhole.png';

const backdrop = new Image();
backdrop.src = 'backdrop.png';
// get highscore from local storage
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById("score").innerHTML ="HighScore : " + highScore + "<br> Last Score : " + score;

function resetGame() {
 // update highscore
 document.getElementById("score").innerHTML ="HighScore : " + highScore + "<br> Last Score : " + score;

    if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    }
  ball.x = 50;
  ball.y = canvas.height - 50;
  hole.x = Math.random() * (canvas.width - 40) + 20;
  createWalls();
  createResetHoles();
}

function gameLoop() {
    // Clear the canvas

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(0-blackHoleRotation / 150);
    // opacity is set to 0.5
    ctx.globalAlpha = 0.9;
    ctx.drawImage(backdrop, -canvas.width , -canvas.height, canvas.width *2, canvas.height *2);
    // reset the opacity
    ctx.globalAlpha = 1;
    ctx.restore();
    // add rotation to the canvas
    drawWalls();
    drawResetHoles();
    drawWinHole();
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(0-blackHoleRotation / 150);
    // opacity is set to 0.5
    ctx.globalAlpha = 0.6;
    ctx.drawImage(backdrop, -canvas.width , -canvas.height, canvas.width *2, canvas.height *2);
    // reset the opacity
    ctx.globalAlpha = 1;
    ctx.restore();
    updateBallPosition();
    drawBall();
    // Display the score
    ctx.font = '24px Arial';
    ctx.fillStyle = '#999';
    ctx.fillText(`Quantum Tilt. By Ben Darlington`,20,20);
    ctx.fillText(`Score: ${score}`, 20, 40);
  
  blackHoleRotation += 0.05;
  angle += 0.006;
  if(isGameStarted) {
    requestAnimationFrame(gameLoop);
  } else {
   
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
