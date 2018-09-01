"use strict";

var r = require("../helpers/parse_link_label"), o = require("../helpers/parse_link_destination"), i = require("../helpers/parse_link_title"), s = require("../common/utils").normalizeReference;

module.exports = function(e, t) {
    var n, a, u, l, c, p, d, h, f, m, g, v, b = "", y = e.pos, _ = e.posMax;
    if (e.src.charCodeAt(e.pos) !== 33) {
        return false;
    }
    if (e.src.charCodeAt(e.pos + 1) !== 91) {
        return false;
    }
    c = e.pos + 2;
    l = r(e, e.pos + 1, false);
    if (l < 0) {
        return false;
    }
    p = l + 1;
    if (_ > p && e.src.charCodeAt(p) === 40) {
        for (p++; _ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        if (p >= _) {
            return false;
        }
        for (v = p, h = o(e.src, p, e.posMax), h.ok && (b = e.md.normalizeLink(h.str), e.md.validateLink(b) ? p = h.pos : b = ""), 
        v = p; _ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        h = i(e.src, p, e.posMax);
        if (_ > p && v !== p && h.ok) {
            for (f = h.str, p = h.pos; _ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
            }
        } else {
            f = "";
        }
        if (p >= _ || e.src.charCodeAt(p) !== 41) {
            e.pos = y;
            return false;
        }
        p++;
    } else {
        if (typeof e.env.references == "undefined") {
            return false;
        }
        for (;_ > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        if (_ > p && e.src.charCodeAt(p) === 91) {
            v = p + 1;
            p = r(e, p);
            if (p >= 0) {
                u = e.src.slice(v, p++);
            } else {
                p = l + 1;
            }
        } else {
            p = l + 1;
        }
        if (!u) {
            u = e.src.slice(c, l)
        };
        d = e.env.references[s(u)];
        if (!d) {
            e.pos = y;
            return false;
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
    return true;
};
