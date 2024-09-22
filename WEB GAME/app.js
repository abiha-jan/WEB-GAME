let inputDir = { x: 0, y: 0 };
let musicSound = new Audio('./left right.wav');
let foodSound = new Audio('./food sound.mp3');
let gameOverSound = new Audio('./cursh voice.mp3');
let moveSound = new Audio('./background.wav');
let speed = 2;
let score = 0;
let lastPainTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let board = document.getElementById('board'); // Get a reference to the board element

function main(ctime) {
  window.requestAnimationFrame(main);
  console.log(ctime);
  if ((ctime - lastPainTime) / 1000 < 1 / speed) {
    return;
  }
  lastPainTime = ctime;
  gameEngine();
}

function isCollide(snakeArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  const snakeHead = snakeArr[0];
  if (snakeHead.x < 0 || snakeHead.x > 18 || snakeHead.y < 0 || snakeHead.y > 18) {
    return true;
  }
  return false;
}

function gameEngine() {
  // part1:update the snack
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to Play Again");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    document.getElementById('score').innerHTML = "Score: 0"; // Update the score element
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    document.getElementById('score').innerHTML = "Score: " + score; // Update the score element
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;

    food = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part2 Display the snake and food
  board.innerHTML = ""; // Clear the board
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });

  let foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
  moveSound.play();
});