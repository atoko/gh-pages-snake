const Header = (() => {
    const { Component, h } = preact;
    class Header extends Component {
        render(props) {
            const { state } = props;
            if (state) {
                return h('div', null, state.points);
            } else {
                return h('div', null, 'Loading..');
            }
        }
    }
    
    return Header;
})()