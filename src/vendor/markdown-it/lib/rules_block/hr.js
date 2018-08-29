"use strict";

module.exports = function(e, t, n, r) {
    var o, i, s, a, u = e.bMarks[t] + e.tShift[t], l = e.eMarks[t];
    o = e.src.charCodeAt(u++);
    if (42 !== o && 45 !== o && 95 !== o) {
        return false;
    }
    for (i = 1; l > u; ) {
        s = e.src.charCodeAt(u++);
        if (s !== o && 32 !== s) {
            return false;
        }
        if (s === o) {
            i++
        };
    }
    if (i < 3) {
        return false;
    }
    if (r) {
        return true;
    }
    e.line = t + 1;
    a = e.push("hr", "hr", 0);
    a.map = [ t, e.line ];
    a.markup = Array(i + 1).join(String.fromCharCode(o));
    return true;
};
