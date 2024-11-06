let gameMode = "tilt"; // Default mode
let isGameStarted = false;
let isDragging = false; // Track whether the mouse is pressed for dragging


document.getElementById("tiltModeButton").addEventListener("click", () => setGameMode("tilt"));
document.getElementById("fingerModeButton").addEventListener("click", () => setGameMode("finger"));
document.getElementById("mouseModeButton").addEventListener("click",() =>  setGameMode("mouse"));
document.getElementById("startButton").addEventListener("click", startGame);

function setGameMode(mode) {
  gameMode = mode;
    removeMouseListeners();
    removeTouchListeners();    
    removeMotionListeners();
  if (mode === "tilt") {
    setupMotionListeners();

  } else if (mode === "finger") {
    setupTouchListeners();
    } else if (mode === "mouse") {
    setupMouseListeners();
    }

    startGame();
   
  
}

document.getElementById("startButton").style.display = "none";

function stopGame() {
    isGameStarted = false;
    document.exitFullscreen();
    document.getElementById("tiltModeButton").style.display = "block";
    document.getElementById("fingerModeButton").style.display = "block";
    document.getElementById("mouseModeButton").style.display = "block";
    document.getElementById("highScore").style.display = "block";
    removeMotionListeners();
    removeMouseListeners();
    removeTouchListeners();
}
function startGame() {
  if (!isGameStarted) {
    isGameStarted = true;

    document.getElementById("tiltModeButton").style.display = "none";
    document.getElementById("fingerModeButton").style.display = "none";
    document.getElementById("mouseModeButton").style.display = "none";
    document.getElementById("highScore").style.display = "none";
    score = 0;
    resetGame();
    gameLoop();
  }
}

function setupMotionListeners() {
  if ('ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

function removeMotionListeners() {
  window.removeEventListener('deviceorientation', handleOrientation);
}

function setupMouseListeners() {
  canvas.addEventListener('mousedown', startDragging);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', stopDragging);
}

function removeMouseListeners() {
  canvas.removeEventListener('mousedown', startDragging);
  canvas.removeEventListener('mousemove', handleMouseMove);
  canvas.removeEventListener('mouseup', stopDragging);
}
function setupTouchListeners() {
    canvas.addEventListener('touchstart', startDragging);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', stopDragging);
  }

  function removeTouchListeners() {
    canvas.removeEventListener('touchstart', startDragging);
    canvas.removeEventListener('touchmove', handleMouseMove);
    canvas.removeEventListener('touchend', stopDragging);
  }
// Start dragging
function startDragging(event) {
  isDragging = true;
}

// Stop dragging
function stopDragging(event) {
  isDragging = false;
}

// Handle orientation changes for tilt mode
function handleOrientation(event) {
  if (gameMode === "tilt") {
    tiltX = event.gamma ;
    tiltY = event.beta ;
    // clamp the values to -20 and 20
    tiltX = Math.min(20, Math.max(-20, tiltX));
    tiltY = Math.min(20, Math.max(-20, tiltY));

  }
}

// Handle mouse movements for finger mode by adjusting gamma and beta
function handleMouseMove(event) {
  if (gameMode != "tilt" && isDragging) {
    const rect = canvas.getBoundingClientRect();

    // Calculate relative position within the canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Map mouseX to gamma (tiltX) and mouseY to beta (tiltY) ranges
    tiltX = ((mouseX / (canvas.width / 2)) - 0.5) * 40; // Simulate gamma: -20 to 20
    tiltY = ((mouseY / (canvas.height / 2)) - 0.5) * 40; // Simulate beta: -20 to 20
  }
}
