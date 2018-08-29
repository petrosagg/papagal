"use strict";

function r(e, t) {
    var n, r, a, u, l, c, p, d, h, f = t, m = true, g = true, v = e.posMax, b = e.src.charCodeAt(t);
    for (n = t > 0 ? e.src.charCodeAt(t - 1) : 32; v > f && e.src.charCodeAt(f) === b; ) {
        f++;
    }
    a = f - t;
    r = v > f ? e.src.charCodeAt(f) : 32;
    p = s(n) || i(String.fromCharCode(n));
    h = s(r) || i(String.fromCharCode(r));
    c = o(n);
    d = o(r);
    if (d) {
        m = false;
    } else {
        if (h) {
            c || p || (m = false)
        };
    }
    if (c) {
        g = false;
    } else {
        if (p) {
            d || h || (g = false)
        };
    }
    if (b === 95) {
        u = m && (!g || p);
        l = g && (!m || h);
    } else {
        u = m;
        l = g;
    }
    return {
        can_open: u,
        can_close: l,
        delims: a
    };
}

var o = require("../common/utils").isWhiteSpace, i = require("../common/utils").isPunctChar, s = require("../common/utils").isMdAsciiPunct;

module.exports = function(e, t) {
    var n, o, i, s, a, u, l, c, p = e.posMax, d = e.pos, h = e.src.charCodeAt(d);
    if (95 !== h && 42 !== h) {
        return false;
    }
    if (t) {
        return false;
    }
    l = r(e, d);
    n = l.delims;
    if (!l.can_open) {
        e.pos += n;
        e.pending += e.src.slice(d, e.pos);
        return true;
    }
    for (e.pos = d + n, u = [ n ]; e.pos < p; ) {
        if (e.src.charCodeAt(e.pos) !== h) {
            e.md.inline.skipToken(e);
        } else {
            l = r(e, e.pos);
            o = l.delims;
            if (l.can_close) {
                for (s = u.pop(), a = o; s !== a; ) {
                    if (s > a) {
                        u.push(s - a);
                        break;
                    }
                    a -= s;
                    if (u.length === 0) {
                        break;
                    }
                    e.pos += s;
                    s = u.pop();
                }
                if (u.length === 0) {
                    n = s;
                    i = true;
                    break;
                }
                e.pos += o;
                continue;
            }
            if (l.can_open) {
                u.push(o)
            };
            e.pos += o;
        }
    }
    if (!i) {
        e.pos = d;
        return false;
    }
    for (e.posMax = e.pos, e.pos = d + n, o = n; o > 1; o -= 2) {
        c = e.push("strong_open", "strong", 1);
        c.markup = String.fromCharCode(h) + String.fromCharCode(h);
    }
    for (o % 2 && (c = e.push("em_open", "em", 1), c.markup = String.fromCharCode(h)), 
    e.md.inline.tokenize(e), o % 2 && (c = e.push("em_close", "em", -1), c.markup = String.fromCharCode(h)), 
    o = n; o > 1; o -= 2) {
        c = e.push("strong_close", "strong", -1);
        c.markup = String.fromCharCode(h) + String.fromCharCode(h);
    }
    e.pos = e.posMax + n;
    e.posMax = p;
    return true;
};
