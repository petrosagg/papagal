function r(e, t) {
    if (e && t) {
        if (e === t) {
            return true;
        }
        if (o(e)) {
            return false;
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
        return false;
    }
    return false;
}

var o = require("./isTextNode");

module.exports = r;
