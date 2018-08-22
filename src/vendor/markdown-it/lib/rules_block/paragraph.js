"use strict";

module.exports = function(e, t) {
    for (var n, r, o, i, s, a = t + 1, u = e.md.block.ruler.getRules("paragraph"), l = e.lineMax; l > a && !e.isEmpty(a); a++) {
        if (!(e.tShift[a] - e.blkIndent > 3 || e.tShift[a] < 0)) {
            for (r = !1, o = 0, i = u.length; i > o; o++) {
                if (u[o](e, a, l, !0)) {
                    r = !0;
                    break;
                }
            }
            if (r) {
                break;
            }
        }
    }
    n = e.getLines(t, a, e.blkIndent, !1).trim();
    e.line = a;
    s = e.push("paragraph_open", "p", 1);
    s.map = [ t, e.line ];
    s = e.push("inline", "", 0);
    s.content = n;
    s.map = [ t, e.line ];
    s.children = [];
    s = e.push("paragraph_close", "p", -1);
    return !0;
};