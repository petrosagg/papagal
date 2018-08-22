"use strict";

module.exports = function(e, t, n) {
    var r, o, i;
    if (e.tShift[t] - e.blkIndent < 4) {
        return !1;
    }
    for (o = r = t + 1; n > r; ) {
        if (e.isEmpty(r)) {
            r++;
        } else {
            if (!(e.tShift[r] - e.blkIndent >= 4)) {
                break;
            }
            r++;
            o = r;
        }
    }
    e.line = r;
    i = e.push("code_block", "code", 0);
    i.content = e.getLines(t, o, 4 + e.blkIndent, !0);
    i.map = [ t, e.line ];
    return !0;
};