"use strict";

function r(e, t) {
    if (e == null) {
        throw new TypeError("Object.assign target cannot be null or undefined");
    }
    for (var n = Object(e), r = Object.prototype.hasOwnProperty, o = 1; o < arguments.length; o++) {
        var i = arguments[o];
        if (i != null) {
            var s = Object(i);
            for (var a in s) {
                if (r.call(s, a)) {
                    n[a] = s[a]
                };
            }
        }
    }
    return n;
}

module.exports = r;
