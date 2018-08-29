"use strict";

var r = require("../helpers/parse_link_label"), o = require("../helpers/parse_link_destination"), i = require("../helpers/parse_link_title"), s = require("../common/utils").normalizeReference;

module.exports = function(e, t) {
    var n, a, u, l, c, p, d, h, f, m, g, v, b = "", y = e.pos, _ = e.posMax;
    if (33 !== e.src.charCodeAt(e.pos)) {
        return !1;
    }
    if (91 !== e.src.charCodeAt(e.pos + 1)) {
        return !1;
    }
    c = e.pos + 2;
    l = r(e, e.pos + 1, !1);
    if (l < 0) {
        return !1;
    }
    p = l + 1;
    if (_ > p && e.src.charCodeAt(p) === 40) {
        for (p++; _ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        if (p >= _) {
            return !1;
        }
        for (v = p, h = o(e.src, p, e.posMax), h.ok && (b = e.md.normalizeLink(h.str), e.md.validateLink(b) ? p = h.pos : b = ""), 
        v = p; _ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        h = i(e.src, p, e.posMax);
        if (_ > p && v !== p && h.ok) {
            for (f = h.str, p = h.pos; _ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
            }
        } else f = "";
        if (p >= _ || 41 !== e.src.charCodeAt(p)) {
            e.pos = y;
            return !1;
        }
        p++;
    } else {
        if (typeof e.env.references == "undefined") {
            return !1;
        }
        for (;_ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        if (_ > p && e.src.charCodeAt(p) === 91) {
            v = p + 1;
            p = r(e, p);
            if (p >= 0) {
                u = e.src.slice(v, p++);
            } else p = l + 1;
        } else p = l + 1;
        u || (u = e.src.slice(c, l));
        d = e.env.references[s(u)];
        if (!d) {
            e.pos = y;
            return !1;
        }
        b = d.href;
        f = d.title;
    }
    if (!t) {
        e.pos = c;
        e.posMax = l;
        var w = new e.md.inline.State(e.src.slice(c, l), e.md, e.env, g = []);
        w.md.inline.tokenize(w);
        m = e.push("image", "img", 0);
        m.attrs = n = [ [ "src", b ], [ "alt", "" ] ];
        m.children = g;
        if (f) {
            n.push([ "title", f ])
        };
    }
    e.pos = p;
    e.posMax = _;
    return !0;
};
