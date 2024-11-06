const hole = {
    x: Math.random() * (canvas.width - 40) + 20,
    y: 50,
    radius: 40,
  };
  
  function drawWinHole() {
    ctx.save();
    ctx.translate(hole.x, hole.y);
    ctx.rotate(blackHoleRotation / 2);
    ctx.globalAlpha = 0.5;
    // white glow effect
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 30;

    ctx.drawImage(winHoleImage, -hole.radius, -hole.radius, hole.radius * 2, hole.radius * 2);
    ctx.globalAlpha = 1;
    ctx.restore();
  }
  