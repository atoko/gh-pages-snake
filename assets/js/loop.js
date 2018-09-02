const loop = (() => {
    let state = game.reducer(undefined, game.actions.newGame());
    let lastTimestamp = performance.now();
    let timeStep = 30;
    let paused = false;

    touch.initialize(document);

    const tick = (timestamp) => {
        const delta = timestamp - lastTimestamp;
        if (delta > timeStep) {

            if (!state.gameOver) {
                const tick = game.actions.moveSnake({
                    x: input.getHorizontal(),
                    y: input.getVertical()
                });
    
                state = game.reducer(state, tick);
                if (state.dots < 1) {
                    const spawnDot = game.actions.spawnDot({});
                    state = game.reducer(state, spawnDot)
                }    
            }

            lastTimestamp = timestamp;            

            render(state, { isPaused: paused });            
        }

        if (!paused) {
            touch.poll();
            requestAnimationFrame(tick);
        }
    }
    requestAnimationFrame(tick)

    return {
        setTimestep: (value) => {
            timeStep = value;
        },
        pause: () => {
            paused = !paused;
            if (!paused) {
                requestAnimationFrame(tick);
            }
        },
        newGame: () => {
            state = game.reducer(undefined, game.actions.newGame());
            input.reset();
            paused = false;
        }
    }
})()
