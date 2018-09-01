const GAME_HEIGHT = 32;
const GAME_WIDTH = 32;

const moveSnake = ({x, y}) => ({
    type: "MOVE_SNAKE",
    xVelocity: x,
    yVelocity: y
});

const spawnDot = ({x = Math.random() * GAME_WIDTH, y = Math.random() * GAME_HEIGHT}) => ({
    type: "SPAWN_DOT",
    x,
    y
})

const moveResult = (state = {}, action) => {
    const { snake, snakeFrames, dots } = state;
    const { xVelocity, yVelocity } = action;

    let snakeNextFrame = {
        ...snake,
        x: snake.x + xVelocity,
        y: snake.y + yVelocity
    };

    let {x, y} = snakeNextFrame;

    if (x < 0 || x > GAME_WIDTH) {
        return { gameOver: true, ...state };
    } 

    if (y < 0 || y > GAME_HEIGHT) {
        return { gameOver: true, ...state };
    }

    let points = 0;
    let dotsNextFrame = dots.filter((dot) => {
        if (dot.x === snakeNextFrame.x && dot.y === snakeNextFrame.y) {
            points++;
            return false;
        }
        return true;
    })

    return {
        ...state,        
        snake: snakeNextFrame,
        snakeFrames: [...snakeFrames, snake],
        dots: dotsNextFrame,
        points: state.points + points
    }
}

const spawnResult = (state = {}, action) => {
    const {x, y} = action;
    const dot = {
        x,
        y
    };
    const dots = [...state.dots, dot];
    return {...state, dots};
}

let initialState = () => ({
    snake: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 },
    snakeFrames: [],
    dots: [],
    points: 0
})

const snakeGame = (state = initialState(), action = {}) => {
    switch (action.type) {
        case "MOVE_SNAKE":
            return moveResult(state, action);
        case "SPAWN_DOT":
            return spawnResult(state, action);
        default:
            return state;
    }
}