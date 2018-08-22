function r(e, t) {
    if (e && t) {
        if (e === t) {
            return !0;
        }
        if (o(e)) {
            return !1;
        }
        if (o(t)) {
            return r(e, t.parentNode);
        }
        if (e.contains) {
            return e.contains(t);
        }
        if (e.compareDocumentPosition) {
            return !!(16 & e.compareDocumentPosition(t));
        }
        return !1;
    }
    return !1;
}

var o = require("./isTextNode");

module.exports = r;