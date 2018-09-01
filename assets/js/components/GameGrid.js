const GameGrid = (() => {
    const { Component, h } = preact;
    class GameGrid extends Component {
        render(props) {
            const { state } = props;
            if (state) {
                const children = [];
                let content = '';
                for(let y = 0; y < state.GAME_HEIGHT; y++) {
                    for(let x = 0; x < state.GAME_WIDTH; x++) {
                        content = '';
                        state.snakeTrail.forEach((snake, i) => {
                            if (snake.x === x && snake.y === y) {
                                content = 'snake'
                                if (i === 0) {
                                    content = 'snake-head';
                                }
                                if (i === state.snakeTrail.length - 1) {
                                    content = 'snake-tail';
                                }
                            }
                        });
                        state.dots.forEach((dot) => {
                            if (dot.x === x && dot.y === y) {
                                content = 'dot';
                            }
                        })

                        children.push(h('div', { class: 'block ' + content}, ''));
                    }   
                    children.push(h('br'));
                }

                return h('div', {id: "game-grid"}, children);

            } else {
                return h('div', null, 'Loading..')
            }
        }
    }
    
    return GameGrid;
})()