"use strict";

function r(e, t, n) {
    if (!e) {
        return null;
    }
    var r = {};
    for (var i in e) {
        if (o.call(e, i)) {
            r[i] = t.call(n, e[i], i, e)
        };
    }
    return r;
}

var o = Object.prototype.hasOwnProperty;

module.exports = r;