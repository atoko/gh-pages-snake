var td = require("testdouble");

var loopContext = require("../../assets/js/loop");
var touchMock = require("./mock/touch");
var gameMock = require("./mock/game");
var inputMock = require("./mock/input");
var renderMock = require('./mock/render');

let once = false;
requestAnimationFrame = (callback) => {
    if (!once) {
        once = true;
        callback(performance.now());
    }
}

describe("main loop", () => {    
    beforeEach(() => {
        touch = touchMock();
        game = gameMock();
        input = inputMock();
        render = renderMock();
    });

    it("initializes touch on document", () => {
        loopContext.bootstrap();
        td.verify(touch.initialize(document));
    });
    it("calls game for a blank reducer", () => {
        loopContext.bootstrap();
        td.verify(game.reducer(undefined, game.actions.newGame()));
    });  

    it("uses input to generate game action", (done) => {
        td.when(game.reducer(td.matchers.anything(), td.matchers.anything()))
            .thenReturn({ gameOver: false, dots: 1 })
                
        var step = loopContext.bootstrap();
        td.when(input.getHorizontal()).thenReturn(1);
        td.when(input.getVertical()).thenReturn(0);


        setTimeout(() => {
            step();
            td.verify(game.actions.moveSnake({x: 1, y: 0}))
            done();
        }, 1000);
    })    
})