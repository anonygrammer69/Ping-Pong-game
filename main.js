const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleHeight = 100;
let paddleWidth = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off top/bottom
  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY *= -1;
  }

  // AI paddle follows ball
  aiY += (ballY - (aiY + paddleHeight / 2)) * 0.09;

  // Collision with paddles
  if (
    ballX <= paddleWidth &&
    ballY > playerY &&
    ballY < playerY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  if (
    ballX >= canvas.width - paddleWidth &&
    ballY > aiY &&
    ballY < aiY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Reset if ball goes off screen
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  drawRect(0, playerY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "white");
  drawBall(ballX, ballY, 10, "white");
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Mouse control
canvas.addEventListener("mousemove", (e) => {
  let rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
});

gameLoop();