const resetHoles = [];

function createResetHoles() {
  resetHoles.length = 0;

  walls.forEach(wall => {
    const resetHole = {
      originalX: Math.random() * (canvas.width - 400) + 200,
      originalY: wall.y + ball.radius * 10,
      radius: ball.radius * 4,
    };

    resetHoles.push(resetHole);
  });
}

function drawResetHoles() {
  resetHoles.forEach(resetHole => {
    resetHole.x = resetHole.originalX + 200 * Math.cos(angle);
    resetHole.y = resetHole.originalY + 200 * Math.sin(angle);

    ctx.save();
    ctx.translate(resetHole.x, resetHole.y);
    ctx.rotate(blackHoleRotation);
    // opacity is set to 0.5
    ctx.globalAlpha = 0.8;
    // black glow effect
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 100;
    
    ctx.drawImage(blackHoleImage, -resetHole.radius, -resetHole.radius, resetHole.radius * 2, resetHole.radius * 2);
    // reset the opacity
    ctx.globalAlpha = 1;
    ctx.restore();
  });
}
