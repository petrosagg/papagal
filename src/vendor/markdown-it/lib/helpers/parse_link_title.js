"use strict";

var r = require("../common/utils").unescapeAll;

module.exports = function(e, t, n) {
    var o, i, s = 0, a = t, u = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
    };
    if (t >= n) {
        return u;
    }
    i = e.charCodeAt(t);
    if (i !== 34 && i !== 39 && i !== 40) {
        return u;
    }
    for (t++, i === 40 && (i = 41); n > t; ) {
        o = e.charCodeAt(t);
        if (o === i) {
            u.pos = t + 1;
            u.lines = s;
            u.str = r(e.slice(a + 1, t));
            u.ok = true;
            return u;
        }
        if (o === 10) {
            s++;
        } else {
            if (o === 92 && n > t + 1) {
                t++;
                if (e.charCodeAt(t) === 10) {
                    s++
                };
            };
        }
        t++;
    }
    return u;
};
