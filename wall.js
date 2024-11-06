const walls = [];

function createWalls() {
  walls.length = 0;
  let yPosition = 200;
  let leftSide = true;

  while (yPosition < canvas.height - 350) {
    const wallLength = (0.3 * canvas.width) + Math.random() * 0.3 * canvas.width;
    const wallX = leftSide ? 0 : canvas.width - wallLength;
    const wallY = yPosition;

    walls.push({ x: wallX, y: wallY, width: wallLength, height: 40 });

    leftSide = !leftSide;
    yPosition += ball.radius * (Math.floor(Math.random() * 8) + 7);
  }
}

function drawWalls() {
  walls.forEach(wall => {
    const gradient = ctx.createLinearGradient(wall.x, wall.y, wall.x, wall.y + wall.height);
    gradient.addColorStop(0.5, '#bbbbbb');
    gradient.addColorStop(1, '#000000');
    gradient.addColorStop(0, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });
}
