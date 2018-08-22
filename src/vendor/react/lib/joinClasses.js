"use strict";

function r(e) {
    e || (e = "");
    var t, n = arguments.length;
    if (n > 1) {
        for (var r = 1; n > r; r++) {
            t = arguments[r];
            if (t) {
                e = (e ? e + " " : "") + t
            };
        }
    }
    return e;
}

module.exports = r;
