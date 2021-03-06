const loop = (() => {
    let state = null;
    let lastTimestamp = 0;
    let timeStep = 300;
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
        bootstrap: () => {
            state = game.reducer(undefined, game.actions.newGame());
            lastTimestamp = performance.now();
            paused = false;

            input.initialize(document);
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
            input.teardown(document);
            input.reset();
            touch.teardown(document);

            if (loopId) {
                cancelAnimationFrame(loopId);
            }
        }
    }
})()

if (typeof module !== "undefined") {
    module.exports = loop;
}