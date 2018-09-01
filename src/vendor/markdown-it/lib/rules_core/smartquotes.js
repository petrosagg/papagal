"use strict";

function r(e, t, n) {
    return e.substr(0, t) + n + e.substr(t + 1);
}

function o(e, t) {
    var n, o, u, p, d, h, f, m, g, v, b, y, _, w, k, x, C, E, T, S, D;
    for (T = [], n = 0; n < e.length; n++) {
        for (o = e[n], f = e[n].level, C = T.length - 1; C >= 0 && !(T[C].level <= f); C--) {
        }
        T.length = C + 1;
        if (o.type === "text") {
            u = o.content;
            d = 0;
            h = u.length;
            e: for (;h > d && (l.lastIndex = d, p = l.exec(u)); ) {
                k = x = true;
                d = p.index + 1;
                E = p[0] === "'";
                if (p.index - 1 >= 0) {
                    g = u.charCodeAt(p.index - 1);
                } else {
                    g = 32;
                }
                if (h > d) {
                    v = u.charCodeAt(d);
                } else {
                    v = 32;
                }
                b = a(g) || s(String.fromCharCode(g));
                y = a(v) || s(String.fromCharCode(v));
                _ = i(g);
                w = i(v);
                if (w) {
                    k = false;
                } else {
                    if (y) {
                        if (!(_ || b)) {
                            k = false
                        }
                    };
                }
                if (_) {
                    x = false;
                } else {
                    if (b) {
                        if (!(w || y)) {
                            x = false
                        }
                    };
                }
                if (v === 34 && p[0] === '"' && g >= 48 && g <= 57) {
                    x = k = false
                };
                if (k && x) {
                    k = false, x = y
                };
                if (k || x) {
                    if (x) {
                        for (C = T.length - 1; C >= 0 && (m = T[C], !(T[C].level < f)); C--) {
                            if (m.single === E && T[C].level === f) {
                                m = T[C];
                                if (E) {
                                    S = t.md.options.quotes[2];
                                    D = t.md.options.quotes[3];
                                } else {
                                    S = t.md.options.quotes[0];
                                    D = t.md.options.quotes[1];
                                }
                                o.content = r(o.content, p.index, D);
                                e[m.token].content = r(e[m.token].content, m.pos, S);
                                d += D.length - 1;
                                if (m.token === n) {
                                    d += S.length - 1
                                };
                                u = o.content;
                                h = u.length;
                                T.length = C;
                                continue e;
                            }
                        }
                    }
                    if (k) {
                        T.push({
                            token: n,
                            pos: p.index,
                            single: E,
                            level: f
                        });
                    } else {
                        if (x && E) {
                            o.content = r(o.content, p.index, c)
                        };
                    }
                } else {
                    if (E) {
                        o.content = r(o.content, p.index, c)
                    };
                }
            }
        }
    }
}

var i = require("../common/utils").isWhiteSpace, s = require("../common/utils").isPunctChar, a = require("../common/utils").isMdAsciiPunct, u = /['"]/, l = /['"]/g, c = "’";

module.exports = function(e) {
    var t;
    if (e.md.options.typographer) {
        for (t = e.tokens.length - 1; t >= 0; t--) {
            if (e.tokens[t].type === "inline" && u.test(e.tokens[t].content)) {
                o(e.tokens[t].children, e)
            };
        }
    }
};
