"use strict";

function r(e) {
    var t = e && (o && e[o] || e[i]);
    if (typeof t == "function") {
        return t;
    }
    return;
}

var o = typeof Symbol == "function" && Symbol.iterator, i = "@@iterator";

module.exports = r;
