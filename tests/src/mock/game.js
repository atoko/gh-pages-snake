var td = require("testdouble");

module.exports = () => {
    return {
        reducer: td.func(),
        actions: {
            newGame: td.func(),
            moveSnake: td.func()
        }
    }
}
