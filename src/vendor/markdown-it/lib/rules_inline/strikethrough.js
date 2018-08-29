"use strict";

function r(e, t) {
    var n, r, a, u, l, c, p, d = t, h = true, f = true, m = e.posMax, g = e.src.charCodeAt(t);
    for (n = t > 0 ? e.src.charCodeAt(t - 1) : 32; m > d && e.src.charCodeAt(d) === g; ) {
        d++;
    }
    if (d >= m) {
        h = false
    };
    a = d - t;
    if (m > d) {
        r = e.src.charCodeAt(d);
    } else {
        r = 32;
    }
    l = s(n) || i(String.fromCharCode(n));
    p = s(r) || i(String.fromCharCode(r));
    u = o(n);
    c = o(r);
    if (c) {
        h = false;
    } else {
        if (p) {
            u || l || (h = false)
        };
    }
    if (u) {
        f = false;
    } else {
        if (l) {
            c || p || (f = false)
        };
    }
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
        return false;
    }
    if (t) {
        return false;
    }
    u = r(e, p);
    n = u.delims;
    if (!u.can_open) {
        e.pos += n;
        e.pending += e.src.slice(p, e.pos);
        return true;
    }
    a = Math.floor(n / 2);
    if (a <= 0) {
        return false;
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
                    s = true;
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
        return true;
    }
    e.pos = p;
    return false;
};
