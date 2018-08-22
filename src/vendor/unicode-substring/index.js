"use strict";

function r(e, t) {
    var n, r = e.charCodeAt(t);
    if (r >= 55296 && r <= 56319 && e.length > t + 1 && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343)) {
        return e.substring(t, t + 2);
    }
    return e[t];
}

function o(e, t, n) {
    for (var o, i = "", s = 0, a = 0, u = e.length; u > s; ) {
        o = r(e, s);
        if (a >= t && n > a) {
            i += o
        };
        s += o.length;
        a += 1;
    }
    return i;
}

function i(e, t) {
    if (e === void 0) {
        return t;
    }
    return Number(e);
}

module.exports = function(e, t, n) {
    var r = i(t, 0), s = i(n, e.length);
    if (s == r) {
        return "";
    }
    if (s > r) {
        return o(e, r, s);
    }
    return o(e, s, r);
};
