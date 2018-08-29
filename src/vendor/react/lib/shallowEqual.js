"use strict";

function r(e, t) {
    if (e === t) {
        return true;
    }
    var n;
    for (n in e) {
        if (e.hasOwnProperty(n) && (!t.hasOwnProperty(n) || e[n] !== t[n])) {
            return false;
        }
    }
    for (n in t) {
        if (t.hasOwnProperty(n) && !e.hasOwnProperty(n)) {
            return false;
        }
    }
    return true;
}

module.exports = r;
