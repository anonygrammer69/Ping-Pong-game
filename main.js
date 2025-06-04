const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle settings
const paddleWidth = 20;
const paddleHeight = 120;
let leftY = canvas.height / 2 - paddleHeight / 2;
let rightY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 50;

// Ball settings
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballDX = 5;
let ballDY = -5;

// Score
let leftScore = 0;
let rightScore = 0;

// Draw paddles
function drawPaddle(x, y) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();
}

// Draw score
function drawScore() {
  ctx.fillStyle = "blue";
  ctx.font = "24px Bahnschrift";
  ctx.textAlign = "center";
  ctx.fillText(`Left player: ${leftScore}  Right player: ${rightScore}`, canvas.width / 2, 40);
}

// Update game state
function update() {
  ballX += ballDX;
  ballY += ballDY;

  // Top and bottom collision
  if (ballY + ballRadius >= canvas.height || ballY - ballRadius <= 0) {
    ballDY *= -1;
  }

  // Left boundary — right scores
  if (ballX - ballRadius < 0) {
    rightScore++;
    resetBall();
  }

  // Right boundary — left scores
  if (ballX + ballRadius > canvas.width) {
    leftScore++;
    resetBall();
  }

  // Left paddle collision
  if (
    ballX - ballRadius <= 40 &&
    ballY >= leftY &&
    ballY <= leftY + paddleHeight
  ) {
    ballDX = 5;
    ballX = 40 + ballRadius;
  }

  // Right paddle collision
  if (
    ballX + ballRadius >= canvas.width - 40 &&
    ballY >= rightY &&
    ballY <= rightY + paddleHeight
  ) {
    ballDX = -5;
    ballX = canvas.width - 40 - ballRadius;
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballDX *= -1;
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawPaddle(20, leftY);
  drawPaddle(canvas.width - 40, rightY);
  drawBall();
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "w":
      leftY = Math.max(0, leftY - paddleSpeed);
      break;
    case "s":
      leftY = Math.min(canvas.height - paddleHeight, leftY + paddleSpeed);
      break;
    case "o":
      rightY = Math.max(0, rightY - paddleSpeed);
      break;
    case "l":
      rightY = Math.min(canvas.height - paddleHeight, rightY + paddleSpeed);
      break;
  }
});

gameLoop();