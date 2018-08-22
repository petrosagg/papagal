function r(e) {
    var t = e.length;
    o(!Array.isArray(e) && (typeof e == "object" || typeof e == "function"));
    o(typeof t == "number");
    o(t === 0 || t - 1 in e);
    if (e.hasOwnProperty) {
        try {
            return Array.prototype.slice.call(e);
        } catch (n) {}
    }
    for (var r = Array(t), i = 0; t > i; i++) {
        r[i] = e[i];
    }
    return r;
}

var o = require("./invariant");

module.exports = r;
