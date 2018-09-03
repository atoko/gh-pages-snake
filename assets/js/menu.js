let menu = (() => {
    const onStart = () => {
        render.clear();
        loop.bootstrap()();    
    }

    return {
        show: () => {
            loop.stop();
            render.clear();
            render.menu({ onStart });
        }
    }
})();

setTimeout(() => {
    menu.show();
}, 50);
