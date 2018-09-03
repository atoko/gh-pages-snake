const render = (() => {
    const { h } = preact;
    let header, game, menu,
        headerTarget, gameTarget, menuTarget;

    //We only need these once, but they aren't available until the script finishes parsing
    setTimeout(() => { 
         headerTarget =  document.getElementById("header-render-target");
         gameTarget = document.getElementById("game-render-target");
         menuTarget = document.getElementById("menu-render-target");
    }, 0)

    const clear = () => {
        headerTarget.innerHTML = "";
        gameTarget.innerHTML = "";
        menuTarget.innerHTML = "";
    }

    return {
        clear,
        game: (state, { isPaused }) => {
            header = preact.render(h(Header, { state, isPaused }), headerTarget, header);      
            game = preact.render(h(GameGrid, { state, isPaused }), gameTarget, game);
        },
        menu: ({onStart}) => {
            menu = preact.render(h(Menu, { onStart }), menuTarget, menu);
        }
    }
})();