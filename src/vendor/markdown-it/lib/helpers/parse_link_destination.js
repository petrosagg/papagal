"use strict";

var r = require("../common/utils").unescapeAll;

module.exports = function(e, t, n) {
    var o, i, s = 0, a = t, u = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
    };
    if (e.charCodeAt(t) === 60) {
        for (t++; n > t; ) {
            o = e.charCodeAt(t);
            if (o === 10) {
                return u;
            }
            if (o === 62) {
                u.pos = t + 1;
                u.str = r(e.slice(a + 1, t));
                u.ok = true;
                return u;
            }
            if (o === 92 && n > t + 1) {
                t += 2;
            } else {
                t++;
            }
        }
        return u;
    }
    for (i = 0; n > t && (o = e.charCodeAt(t), o !== 32) && !(o < 32 || o === 127); ) {
        if (o === 92 && n > t + 1) {
            t += 2;
        } else {
            if (o === 40 && (i++, i > 1)) {
                break;
            }
            if (o === 41 && (i--, i < 0)) {
                break;
            }
            t++;
        }
    }
    if (a === t) {
        return u;
    }
    u.str = r(e.slice(a, t));
    u.lines = s;
    u.pos = t;
    u.ok = true;
    return u;
};
