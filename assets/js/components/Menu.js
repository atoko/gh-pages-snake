const Menu = (() => {
    const { Component, h } = preact;
    const c = (className) => {
        return { class: className };
    }
    class Menu extends Component {
        selectDifficulty(event) {
            loop.setTimestep(event.target.value);
        }
        render({ onStart }) {
            return h('div', c('menu-container'), [
                    h('div', c('box'), 
                        h('h1', null, 'Snake'),
                        h('p', null, 'You are a snake with an appetite ', 
                            h('span', c('no-break'), '(', h('div', c('block snake-head'), ''), h('div', c('block snake'), ''), h('div', c('block snake-tail'), ''), ')'))
                    ),
                    h('div', c('box'), 
                        h('h2', null, 'Objective'),
                        h('p', null, 'Eat all of the dots (', h('div', c('block dot'), ''), ')'),                                                                      
                    ),
                    h('div', c('box'), 
                        h('h2', null, 'How to play'),
                        h('div', null, 
                            h('ul', null, [
                                h('li', c('desktop-only'), 'Use the arrow keys to move'),
                                h('li', c('mobile-only'), 'Swipe the screen to move'),
                                h('li', null, 'Don\'t fall off the edge of the screen'),
                                h('li', null, 'Avoid eating your own tail')                                
                            ])
                        )                
                    ),
                    h('div', c('box'),
                        h('h2', null, 'Options '), 
                        h('div', c('option'),                        
                            h('span', c('label'), 'Difficulty '),
                            h('span', c('select-container'), 
                                h('select', { onChange: this.selectDifficulty }, [
                                    h('option', { value: 300 }, "Easy"),
                                    h('option', { value: 150 }, "Medium"),
                                    h('option', { value: 75 }, "Hard"),     
                                    h('option', { value: 30 }, "Expert"),                                                                                  
                                ]),                    
                            )
                        )
                    ),
                    h('div', c('center'),             
                        h('button', { onClick: onStart }, 'Start Game')
                    )
                    
                ]
            );
        }
    }
    
    return Menu;
})()