function getAIDirection(snake, food) {
    let head = snake[0];

    let dx = food.x - head.x;
    let dy = food.y - head.y;

    // try horizontal first
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction !== "LEFT") return "RIGHT";
        if (dx < 0 && direction !== "RIGHT") return "LEFT";
    }

    // then vertical
    if (dy > 0 && direction !== "UP") return "DOWN";
    if (dy < 0 && direction !== "DOWN") return "UP";

    return direction;
}
