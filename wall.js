const walls = [];

function createWalls() {
  walls.length = 0;
  let yPosition = 200;
  let leftSide = true;

  while (yPosition < canvas.height) {
    const wallLength = (0.3 * canvas.width) + Math.random() * 0.3 * canvas.width;
    const wallX = leftSide ? 0 : canvas.width - wallLength;
    const wallY = yPosition;

    walls.push({ x: wallX, y: wallY, width: wallLength, height: 20 });

    leftSide = !leftSide;
    yPosition += ball.radius * (Math.floor(Math.random() * 8) + 7);
  }
}

function drawWalls() {
  walls.forEach(wall => {
    const gradient = ctx.createLinearGradient(wall.x, wall.y, wall.x + wall.width, wall.y);
    gradient.addColorStop(0, '#bbbbbb');
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });
}
