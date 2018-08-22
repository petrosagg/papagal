"use strict";

module.exports = function(e, t, n) {
    var r, o, i, s, a = -1, u = e.posMax, l = e.pos;
    for (e.pos = t + 1, r = 1; e.pos < u; ) {
        i = e.src.charCodeAt(e.pos)
        if (i === 93 && (r--, r === 0)) {
            o = !0;
            break;
        }
        s = e.pos
        e.md.inline.skipToken(e)
        if (i === 91) {
            if (s === e.pos - 1) {
                r++;
            } else if (n) {
                e.pos = l;
                return -1;
            }
        }
    }
    if (o) {
        a = e.pos
    };
    e.pos = l;
    return a;
};