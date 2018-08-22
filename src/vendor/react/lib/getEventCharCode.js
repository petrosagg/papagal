"use strict";

function r(e) {
    var t, n = e.keyCode;
    "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n;
    if (t >= 32 || t === 13) {
        return t;
    }
    return 0;
}

module.exports = r;
