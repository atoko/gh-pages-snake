const Header = (() => {
    const { Component, h } = preact;
    class Header extends Component {
        reset() {
            loop.newGame();
        }
        pause() {
            loop.pause();
        }
        render(props) {
            const { state } = props;
            if (state) {
                const { points } = state;
                return h('ul', null, [
                        h('li', null, points),
                        h('li', null, 
                            h('button', { onClick: this.reset}, 'reset')
                        ),

                        h('li', null, 
                            h('button', { onClick: this.pause}, 'pause')
                        )                        
                    ]
                );
            } else {
                return h('div', null, 'Loading..');
            }
        }
    }
    
    return Header;
})()