const loop = (() => {
    let state = null;
    let lastTimestamp = 0;
    let timeStep = 30;
    let paused = false;
    let loopId = null;

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
        },
        bootstrap: () => {
            state = game.reducer(undefined, game.actions.newGame());
            lastTimestamp = performance.now();
            paused = false;

            touch.initialize(document);

            const tick = (timestamp) => {
                const delta = timestamp - lastTimestamp;
                if (delta > timeStep) {
                    touch.poll();
        
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
        
                    render.game(state, { isPaused: paused });            
                }
        
                if (!paused) {
                    loopId = requestAnimationFrame(tick);
                }
            }
            return () => requestAnimationFrame(tick)        
        },
        stop: () => {
            if (loopId) {
                cancelAnimationFrame(loopId);
            }
        }
    }
})()

if (typeof module !== "undefined") {
    module.exports = loop;
}