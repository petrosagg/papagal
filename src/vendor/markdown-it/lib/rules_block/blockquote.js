"use strict";

module.exports = function(e, t, n, r) {
    var o, i, s, a, u, l, c, p, d, h, f, m, g = e.bMarks[t] + e.tShift[t], v = e.eMarks[t];
    if (62 !== e.src.charCodeAt(g++)) {
        return !1;
    }
    if (r) {
        return !0;
    }
    for (e.src.charCodeAt(g) === 32 && g++, u = e.blkIndent, e.blkIndent = 0, a = [ e.bMarks[t] ], 
    e.bMarks[t] = g, g = v > g ? e.skipSpaces(g) : g, i = g >= v, s = [ e.tShift[t] ], 
    e.tShift[t] = g - e.bMarks[t], p = e.md.block.ruler.getRules("blockquote"), o = t + 1; n > o && !(e.tShift[o] < u) && (g = e.bMarks[o] + e.tShift[o], 
    v = e.eMarks[o], !(g >= v)); o++) {
        if (62 !== e.src.charCodeAt(g++)) {
            if (i) {
                break;
            }
            for (m = !1, h = 0, f = p.length; f > h; h++) {
                if (p[h](e, o, n, !0)) {
                    m = !0;
                    break;
                }
            }
            if (m) {
                break;
            }
            a.push(e.bMarks[o]);
            s.push(e.tShift[o]);
            e.tShift[o] = -1;
        } else e.src.charCodeAt(g) === 32 && g++, a.push(e.bMarks[o]), e.bMarks[o] = g, 
        g = v > g ? e.skipSpaces(g) : g, i = g >= v, s.push(e.tShift[o]), e.tShift[o] = g - e.bMarks[o];
    }
    for (l = e.parentType, e.parentType = "blockquote", d = e.push("blockquote_open", "blockquote", 1), 
    d.markup = ">", d.map = c = [ t, 0 ], e.md.block.tokenize(e, t, o), d = e.push("blockquote_close", "blockquote", -1), 
    d.markup = ">", e.parentType = l, c[1] = e.line, h = 0; h < s.length; h++) {
        e.bMarks[h + t] = a[h];
        e.tShift[h + t] = s[h];
    }
    e.blkIndent = u;
    return !0;
};