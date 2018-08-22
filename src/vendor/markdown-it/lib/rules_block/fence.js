"use strict";

module.exports = function(e, t, n, r) {
    var o, i, s, a, u, l, c, p = !1, d = e.bMarks[t] + e.tShift[t], h = e.eMarks[t];
    if (d + 3 > h) {
        return !1;
    }
    o = e.src.charCodeAt(d)
    if (126 !== o && 96 !== o) {
        return !1;
    }
    u = d
    d = e.skipChars(d, o)
    i = d - u
    if (i < 3) {
        return !1;
    }
    c = e.src.slice(u, d)
    s = e.src.slice(d, h)
    if (s.indexOf("`") >= 0) {
        return !1;
    }
    if (r) {
        return !0;
    }
    for (a = t; (a++, !(a >= n)) && (d = u = e.bMarks[a] + e.tShift[a], h = e.eMarks[a], 
    !(h > d && e.tShift[a] < e.blkIndent)); ) {
        if (e.src.charCodeAt(d) === o && !(e.tShift[a] - e.blkIndent >= 4 || (d = e.skipChars(d, o), 
        i > d - u || (d = e.skipSpaces(d), h > d)))) {
            p = !0;
            break;
        }
    }
    i = e.tShift[t];
    e.line = a + (p ? 1 : 0);
    l = e.push("fence", "code", 0);
    l.info = s;
    l.content = e.getLines(t + 1, a, i, !0);
    l.markup = c;
    l.map = [ t, e.line ];
    return !0;
};
