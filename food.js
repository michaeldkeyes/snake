import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
let foodEaten = 0;
let score = 0;
const EXPANSION_RATE = 2;
const scoreSpan = document.getElementById("score");
const highScoreSpan = document.getElementById("highScore");

let highScore = localStorage.getItem("highScore");
highScoreSpan.innerHTML = highScore;

export function update() {
  if (onSnake(food)) {
    foodEaten++;
    if (foodEaten % 10 === 0) {
      score += 20;
    } else {
      score += 5;
    }
    scoreSpan.innerHTML = score;
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }

  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
