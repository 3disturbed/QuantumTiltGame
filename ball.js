// Load ball image
const ballImage = new Image();
ballImage.src = 'ball.png';
const ball = {
    x: 50,
    y: canvas.height - 50,
    radius: 15,
    color: 'rgba(255, 255, 255, 1)',
    speed: 0.5,
    rotationAngle: 0, // Rotation angle for the ball
  };
  
  let tiltX = 0;
  let tiltY = 0;
  
  function drawBall() {
    ball.rotationAngle -= 0.005;
  
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.rotate(ball.rotationAngle);
    // add glow effect to the ball
    ctx.shadowColor = ball.color;
    ctx.shadowBlur = 10;

    ctx.drawImage(ballImage, -ball.radius, -ball.radius, ball.radius * 2, ball.radius * 2);
    ctx.restore();
  }
  
  function updateBallPosition() {

      ball.x += tiltX * ball.speed;
      ball.y += tiltY * ball.speed;
  
      // Keep ball within boundaries
      if (ball.x - ball.radius < 0) ball.x = ball.radius;
      if (ball.x + ball.radius > canvas.width) ball.x = canvas.width - ball.radius;
      if (ball.y - ball.radius < 0) ball.y = ball.radius;
      if (ball.y + ball.radius > canvas.height) ball.y = canvas.height - ball.radius;
  
      // Check collisions
      checkWallCollision();
      checkBlackHoleCollision();
      checkWinHoleCollision();
    
  }
  
  // Collision with walls
  function checkWallCollision() {
    walls.forEach(wall => {
      if (
        ball.x + ball.radius > wall.x &&
        ball.x - ball.radius < wall.x + wall.width &&
        ball.y + ball.radius > wall.y &&
        ball.y - ball.radius < wall.y + wall.height
      ) {
        // Adjust ball position based on the collision side
        if (ball.x < wall.x) {
          ball.x = wall.x - ball.radius; // Left side
        } else if (ball.x > wall.x + wall.width) {
          ball.x = wall.x + wall.width + ball.radius; // Right side
        }
  
        if (ball.y < wall.y) {
          ball.y = wall.y - ball.radius; // Top side
        } else if (ball.y > wall.y + wall.height) {
          ball.y = wall.y + wall.height + ball.radius; // Bottom side
        }
      }
    });
  }
  // Collision with win hole (goal)
function checkWinHoleCollision() {
    const dx = ball.x - hole.x;
    const dy = ball.y - hole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < ball.radius + hole.radius) {
      score++; // Increase score when reaching the win hole
      resetGame(); // Reset the game or relocate the win hole
    }
  }
  // Collision with black holes (reset holes)
  function checkBlackHoleCollision() {
    resetHoles.forEach(resetHole => {
      const dx = ball.x - resetHole.x;
      const dy = ball.y - resetHole.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < ball.radius + resetHole.radius) {
        stopGame();
        resetGame(); // Reset the game if the ball hits a black hole
      }
    });
  }
  