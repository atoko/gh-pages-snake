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
                return h('ul', { class: 'header-container' }, [
                        h('li', { class: 'header-points'}, [
                            h('label', null, 'Points'),
                            h('div', null, points)
                        ]),
                        h('li', { class: 'header-reset' }, 
                            h('button', { onClick: this.reset}, 'reset')
                        ),
                    ]
                );
            } else {
                return h('div', null, 'Loading..');
            }
        }
    }
    
    return Header;
})()