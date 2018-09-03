var td = require("testdouble");

module.exports = () => {
    return {
        initialize: td.func(),
        poll: td.func()
    };
}
