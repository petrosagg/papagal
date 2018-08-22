function r() {
    if (typeof document.createElement != "function") {
        return document.createElement(arguments[0]);
    }
    if (o) {
        return document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]);
    }
    return document.createElement.apply(document, arguments);
}

var o = require("./isSVG");

module.exports = r;