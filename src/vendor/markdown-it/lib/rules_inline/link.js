"use strict";

var r = require("../helpers/parse_link_label"), o = require("../helpers/parse_link_destination"), i = require("../helpers/parse_link_title"), s = require("../common/utils").normalizeReference;

module.exports = function(e, t) {
    var n, a, u, l, c, p, d, h, f, m, g = "", v = e.pos, b = e.posMax, y = e.pos;
    if (e.src.charCodeAt(e.pos) !== 91) {
        return false;
    }
    c = e.pos + 1;
    l = r(e, e.pos, true);
    if (l < 0) {
        return false;
    }
    p = l + 1;
    if (b > p && e.src.charCodeAt(p) === 40) {
        for (p++; b > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        if (p >= b) {
            return false;
        }
        for (y = p, d = o(e.src, p, e.posMax), d.ok && (g = e.md.normalizeLink(d.str), e.md.validateLink(g) ? p = d.pos : g = ""), 
        y = p; b > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        d = i(e.src, p, e.posMax);
        if (b > p && y !== p && d.ok) {
            for (f = d.str, p = d.pos; b > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
            }
        } else {
            f = "";
        }
        if (p >= b || e.src.charCodeAt(p) !== 41) {
            e.pos = v;
            return false;
        }
        p++;
    } else {
        if (typeof e.env.references == "undefined") {
            return false;
        }
        for (;b > p && (a = e.src.charCodeAt(p), a === 32 || a === 10); p++) {
        }
        if (b > p && e.src.charCodeAt(p) === 91) {
            y = p + 1;
            p = r(e, p);
            if (p >= 0) {
                u = e.src.slice(y, p++);
            } else {
                p = l + 1;
            }
        } else {
            p = l + 1;
        }
        if (!u) {
            u = e.src.slice(c, l)
        };
        h = e.env.references[s(u)];
        if (!h) {
            e.pos = v;
            return false;
        }
        g = h.href;
        f = h.title;
    }
    if (!t) {
        e.pos = c, e.posMax = l, m = e.push("link_open", "a", 1), m.attrs = n = [ [ "href", g ] ], 
        f && n.push([ "title", f ]), e.md.inline.tokenize(e), m = e.push("link_close", "a", -1)
    };
    e.pos = p;
    e.posMax = b;
    return true;
};
