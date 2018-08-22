"use strict";

function r(e) {
    for (var t = 1, n = 0, r = 0; r < e.length; r++) {
        t = (t + e.charCodeAt(r)) % o;
        n = (n + t) % o;
    }
    return t | n << 16;
}

var o = 65521;

module.exports = r;
