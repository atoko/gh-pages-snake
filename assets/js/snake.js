const game = (() => {
    const GAME_HEIGHT = 32;
    const GAME_WIDTH = 32;
    
    const moveSnake = ({x, y}) => ({
        type: "MOVE_SNAKE",
        xVelocity: x,
        yVelocity: y
    });
    
    const spawnDot = ({
        x = Math.floor(Math.random() * GAME_WIDTH), 
        y = Math.floor(Math.random() * GAME_HEIGHT)
    }) => ({
        type: "SPAWN_DOT",
        x,
        y
    })

    const newGame = () => ({
        type: "NEW_GAME"
    })    
    
    const moveResult = (state = {}, action) => {
        const { snakeTrail, dots, points } = state;
        const { xVelocity, yVelocity } = action;
    
        const snake = snakeTrail[0];

        let snakeNextFrame = {
            ...snake,
            x: snake.x + xVelocity,
            y: snake.y + yVelocity
        };
    
        let {x, y} = snakeNextFrame;
    
        if (x < 0 || x > GAME_WIDTH - 1) {
            return { gameOver: true, ...state };
        } 
    
        if (y < 0 || y > GAME_HEIGHT - 1) {
            return { gameOver: true, ...state };
        }

        let collidedWithTrail = snakeTrail.reduce((collided, trail) => {
            return collided || (x === trail.x && y === trail.y)
        }, false);
        if (collidedWithTrail) {
            return { gameOver: true, ...state };
        }
    
        let pointsNextFrame = points;
        let dotsNextFrame = dots.filter((dot) => {
            if (dot.x === x && dot.y === y) {
                pointsNextFrame++;
                return false;
            }
            return true;
        })

        let snakeTrailNextFrame = [snakeNextFrame, ...snakeTrail]
        .slice(0, pointsNextFrame + 1)
    
        return {
            ...state,
            snakeTrail: snakeTrailNextFrame,
            dots: dotsNextFrame,
            points: pointsNextFrame
        }
    }
    
    const spawnResult = (state = {}, action) => {
        const {snakeTrail} = state;
        const {x, y} = action;
        const dot = {
            x,
            y
        };

        let coordinateIsOccupied = snakeTrail.reduce((occupied, trail) => {
            return occupied || (x === trail.x && y === trail.y)
        }, false);

        if (coordinateIsOccupied) {
            return { ...state };
        }
            
        return {...state, dots: [...state.dots, dot]};
    }
    
    let initialState = () => ({
        snakeTrail: [{ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 }],
        dots: [],
        points: 0,
        GAME_HEIGHT,
        GAME_WIDTH
    })
    
    const snakeGame = (state = initialState(), action = {}) => {
        switch (action.type) {
            case "MOVE_SNAKE":
                return moveResult(state, action);
            case "SPAWN_DOT":
                return spawnResult(state, action);
            case "NEW_GAME":
                return initialState();
            default:
                return state;
        }
    }

    return {
        reducer: snakeGame,
        actions: {
            moveSnake,
            spawnDot,
            newGame
        }   
    };
})();