const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
    { x: 9 * box, y: 10 * box }
];

let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let score = 0;

// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (!autoPlay) {
        if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }
});

function drawGame() {

    // AI Control
    if (autoPlay) {
        direction = getAIDirection(snake, food);
    }

    // Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Food
    ctx.fillStyle = "#EA4335";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw Snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i === 0)
            ? "#34A853"
            : "#2E7D32";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;

    // Eat food
    if (snakeX === food.x && snakeY === food.y) {

        score++;
        document.getElementById("score").innerText =
            "Score: " + score;

        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };

    } else {

        snake.pop();

    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game Over
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {

        clearInterval(game);
        alert("💀 Game Over!\nScore: " + score);
        return;

    }

    snake.unshift(newHead);
}

function collision(head, body) {

    for (let i = 0; i < body.length; i++) {

        if (
            head.x === body[i].x &&
            head.y === body[i].y
        ) {
            return true;
        }

    }

    return false;
}

let game = setInterval(drawGame, 100);
