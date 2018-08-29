"use strict";

var r = require("../common/html_blocks"), o = require("../common/html_re").HTML_OPEN_CLOSE_TAG_RE, i = [ [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true ], [ /^<!--/, /-->/, true ], [ /^<\?/, /\?>/, true ], [ /^<![A-Z]/, />/, true ], [ /^<!\[CDATA\[/, /\]\]>/, true ], [ new RegExp("^</?(" + r.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true ], [ new RegExp(o.source + "\\s*$"), /^$/, false ] ];

module.exports = function(e, t, n, r) {
    var o, s, a, u, l = e.bMarks[t] + e.tShift[t], c = e.eMarks[t];
    if (!e.md.options.html) {
        return false;
    }
    if (60 !== e.src.charCodeAt(l)) {
        return false;
    }
    for (u = e.src.slice(l, c), o = 0; o < i.length && !i[o][0].test(u); o++) {
    }
    if (o === i.length) {
        return false;
    }
    if (r) {
        return i[o][2];
    }
    s = t + 1;
    if (!i[o][1].test(u)) {
        for (;n > s && !(e.tShift[s] < e.blkIndent); s++) {
            l = e.bMarks[s] + e.tShift[s];
            c = e.eMarks[s];
            u = e.src.slice(l, c);
            if (i[o][1].test(u)) {
                if (0 !== u.length) {
                    s++
                };
                break;
            }
        }
    }
    e.line = s;
    a = e.push("html_block", "", 0);
    a.map = [ t, s ];
    a.content = e.getLines(t, s, e.blkIndent, true);
    return true;
};
