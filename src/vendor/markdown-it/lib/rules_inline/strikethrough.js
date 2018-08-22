"use strict";

function r(e, t) {
    var n, r, a, u, l, c, p, d = t, h = !0, f = !0, m = e.posMax, g = e.src.charCodeAt(t);
    for (n = t > 0 ? e.src.charCodeAt(t - 1) : 32; m > d && e.src.charCodeAt(d) === g; ) {
        d++;
    }
    if (d >= m) {
        h = !1
    };
    a = d - t;
    r = m > d ? e.src.charCodeAt(d) : 32;
    l = s(n) || i(String.fromCharCode(n));
    p = s(r) || i(String.fromCharCode(r));
    u = o(n);
    c = o(r);
    c ? h = !1 : p && (u || l || (h = !1));
    u ? f = !1 : l && (c || p || (f = !1));
    return {
        can_open: h,
        can_close: f,
        delims: a
    };
}

var o = require("../common/utils").isWhiteSpace, i = require("../common/utils").isPunctChar, s = require("../common/utils").isMdAsciiPunct;

module.exports = function(e, t) {
    var n, o, i, s, a, u, l, c = e.posMax, p = e.pos, d = e.src.charCodeAt(p);
    if (126 !== d) {
        return !1;
    }
    if (t) {
        return !1;
    }
    u = r(e, p);
    n = u.delims;
    if (!u.can_open) {
        e.pos += n;
        e.pending += e.src.slice(p, e.pos);
        return !0;
    }
    a = Math.floor(n / 2);
    if (a <= 0) {
        return !1;
    }
    for (e.pos = p + n; e.pos < c; ) {
        if (e.src.charCodeAt(e.pos) !== d) {
            e.md.inline.skipToken(e);
        } else {
            u = r(e, e.pos);
            o = u.delims;
            i = Math.floor(o / 2);
            if (u.can_close) {
                if (i >= a) {
                    e.pos += o - 2;
                    s = !0;
                    break;
                }
                a -= i;
                e.pos += o;
                continue;
            }
            if (u.can_open) {
                a += i
            };
            e.pos += o;
        }
    }
    if (s) {
        e.posMax = e.pos;
        e.pos = p + 2;
        l = e.push("s_open", "s", 1);
        l.markup = "~~";
        e.md.inline.tokenize(e);
        l = e.push("s_close", "s", -1);
        l.markup = "~~";
        e.pos = e.posMax + 2;
        e.posMax = c;
        return !0;
    }
    e.pos = p;
    return !1;
};
