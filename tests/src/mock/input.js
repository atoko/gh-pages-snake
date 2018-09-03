var td = require("testdouble");

module.exports = () => {
    return {
        getHorizontal: td.func(),
        getVertical: td.func()
    };
}
