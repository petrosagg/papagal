function r(e) {
    return !!e && (typeof e == "object" || typeof e == "function") && "length" in e && !("setInterval" in e) && typeof e.nodeType != "number" && (Array.isArray(e) || "callee" in e || "item" in e);
}

function o(e) {
    if (r(e)) {
        if (Array.isArray(e)) {
            return e.slice();
        }
        return i(e);
    }
    return [ e ];
}

var i = require("./toArray");

module.exports = o;