"use strict";

var r = require("../helpers/parse_link_destination"), o = require("../helpers/parse_link_title"), i = require("../common/utils").normalizeReference;

module.exports = function(e, t, n, s) {
    var a, u, l, c, p, d, h, f, m, g, v, b, y, _, w, k = 0, x = e.bMarks[t] + e.tShift[t], C = e.eMarks[t], E = t + 1;
    if (e.src.charCodeAt(x) !== 91) {
        return false;
    }
    for (;++x < C; ) {
        if (e.src.charCodeAt(x) === 93 && e.src.charCodeAt(x - 1) !== 92) {
            if (x + 1 === C) {
                return false;
            }
            if (e.src.charCodeAt(x + 1) !== 58) {
                return false;
            }
            break;
        }
    }
    for (c = e.lineMax, _ = e.md.block.ruler.getRules("reference"); c > E && !e.isEmpty(E); E++) {
        if (!(e.tShift[E] - e.blkIndent > 3 || e.tShift[E] < 0)) {
            for (y = false, d = 0, h = _.length; h > d; d++) {
                if (_[d](e, E, c, true)) {
                    y = true;
                    break;
                }
            }
            if (y) {
                break;
            }
        }
    }
    for (b = e.getLines(t, E, e.blkIndent, false).trim(), C = b.length, x = 1; C > x; x++) {
        a = b.charCodeAt(x);
        if (a === 91) {
            return false;
        }
        if (a === 93) {
            m = x;
            break;
        }
        if (a === 10) {
            k++;
        } else {
            if (a === 92) {
                x++;
                if (C > x && b.charCodeAt(x) === 10) {
                    k++
                };
            };
        }
    }
    if (m < 0 || b.charCodeAt(m + 1) !== 58) {
        return false;
    }
    for (x = m + 2; C > x; x++) {
        a = b.charCodeAt(x);
        if (a === 10) {
            k++;
        } else if (a !== 32) {
            break;
        }
    }
    g = r(b, x, C);
    if (!g.ok) {
        return false;
    }
    p = e.md.normalizeLink(g.str);
    if (!e.md.validateLink(p)) {
        return false;
    }
    for (x = g.pos, k += g.lines, u = x, l = k, v = x; C > x; x++) {
        a = b.charCodeAt(x);
        if (a === 10) {
            k++;
        } else if (a !== 32) {
            break;
        }
    }
    for (g = o(b, x, C), C > x && v !== x && g.ok ? (w = g.str, x = g.pos, k += g.lines) : (w = "", 
    x = u, k = l); C > x && b.charCodeAt(x) === 32; ) {
        x++;
    }
    if (C > x && b.charCodeAt(x) !== 10 && w) {
        for (w = "", x = u, k = l; C > x && b.charCodeAt(x) === 32; ) {
            x++;
        }
    }
    if (C > x && b.charCodeAt(x) !== 10) {
        return false;
    }
    f = i(b.slice(1, m));
    if (f) {
        if (s) {
            return true;
        }
        if (typeof e.env.references == "undefined") {
            e.env.references = {}
        };
        if (typeof e.env.references[f] == "undefined") {
            e.env.references[f] = {
                title: w,
                href: p
            }
        };
        e.line = t + k + 1;
        return true;
    }
    return false;
};
