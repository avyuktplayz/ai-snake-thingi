const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20; // grid size

let snake = [
    { x: 9 * box, y: 10 * box }
];

let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * 40) * box,
    y: Math.floor(Math.random() * 30) * box
};

let score = 0;

// controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function drawGame() {
    // background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "#34a853" : "#2e7d32";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // draw food
    ctx.fillStyle = "#ea4335";
    ctx.fillRect(food.x, food.y, box, box);

    // old head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // direction movement
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;

    // eat food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;

        food = {
            x: Math.floor(Math.random() * 40) * box,
            y: Math.floor(Math.random() * 30) * box
        };
    } else {
        snake.pop();
    }

    // new head
    let newHead = { x: snakeX, y: snakeY };

    // game over (wall hit)
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over 💀 Score: " + score);
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(drawGame, 100);
