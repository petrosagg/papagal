"use strict";

function r(e, t) {
    if (e === t) {
        return !0;
    }
    var n;
    for (n in e) {
        if (e.hasOwnProperty(n) && (!t.hasOwnProperty(n) || e[n] !== t[n])) {
            return !1;
        }
    }
    for (n in t) {
        if (t.hasOwnProperty(n) && !e.hasOwnProperty(n)) {
            return !1;
        }
    }
    return !0;
}

module.exports = r;