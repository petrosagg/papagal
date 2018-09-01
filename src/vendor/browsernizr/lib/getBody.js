function r() {
    var e = document.body;
    if (!e) {
        e = o(i ? "svg" : "body"), e.fake = true
    };
    return e;
}

var o = require("./createElement"), i = require("./isSVG");

module.exports = r;
