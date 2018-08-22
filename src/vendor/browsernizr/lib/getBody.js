function r() {
    var e = document.body;
    e || (e = o(i ? "svg" : "body"), e.fake = !0);
    return e;
}

var o = require("./createElement"), i = require("./isSVG");

module.exports = r;