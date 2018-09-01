const render = (() => {
    const { h } = preact;
    let header, game, headerTarget, gameTarget;

    //We only need these once, but they aren't available until the script finishes parsing
    setTimeout(() => {
         headerTarget =  document.getElementById("header-render-target");
         gameTarget = document.getElementById("game-render-target");
    }, 0)

    return (state) => {
        header = preact.render(h(Header, { state }), headerTarget, header)        
        game = preact.render(h(GameGrid, { state }), gameTarget, game)
    }
})();