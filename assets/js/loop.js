const loop = (() => {
    let state;
    let lastTimestamp;
    let timeStep;
    let paused;

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
            timeStep = 30;
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
        
                    render(state, { isPaused: paused });            
                }
        
                if (!paused) {
                    requestAnimationFrame(tick);
                }
            }
            return () => requestAnimationFrame(tick)        
        }
    }
})()

if (typeof module !== "undefined") {
    module.exports = loop;
}