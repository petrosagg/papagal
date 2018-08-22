"use strict";

function r(e) {
    return /^<a[>\s]/i.test(e);
}

function o(e) {
    return /^<\/a\s*>/i.test(e);
}

var i = require("../common/utils").arrayReplaceAt;

module.exports = function(e) {
    var t, n, s, a, u, l, c, p, d, h, f, m, g, v, b, y, _, w = e.tokens;
    if (e.md.options.linkify) {
        for (n = 0, s = w.length; s > n; n++) {
            if (w[n].type === "inline" && e.md.linkify.pretest(w[n].content)) {
                for (a = w[n].children, g = 0, t = a.length - 1; t >= 0; t--) {
                    l = a[t];
                    if ("link_close" !== l.type) {
                        if (l.type === "html_inline") {
                            r(l.content) && g > 0 && g--, o(l.content) && g++
                        };
                        if (!(g > 0) && l.type === "text" && e.md.linkify.test(l.content)) {
                            for (d = l.content, _ = e.md.linkify.match(d), c = [], m = l.level, f = 0, p = 0; p < _.length; p++) {
                                v = _[p].url;
                                b = e.md.normalizeLink(v);
                                if (e.md.validateLink(b)) {
                                    y = _[p].text, y = _[p].schema ? "mailto:" !== _[p].schema || /^mailto:/i.test(y) ? e.md.normalizeLinkText(y) : e.md.normalizeLinkText("mailto:" + y).replace(/^mailto:/, "") : e.md.normalizeLinkText("http://" + y).replace(/^http:\/\//, ""), 
                                    h = _[p].index, h > f && (u = new e.Token("text", "", 0), u.content = d.slice(f, h), 
                                    u.level = m, c.push(u)), u = new e.Token("link_open", "a", 1), u.attrs = [ [ "href", b ] ], 
                                    u.level = m++, u.markup = "linkify", u.info = "auto", c.push(u), u = new e.Token("text", "", 0), 
                                    u.content = y, u.level = m, c.push(u), u = new e.Token("link_close", "a", -1), u.level = --m, 
                                    u.markup = "linkify", u.info = "auto", c.push(u), f = _[p].lastIndex
                                };
                            }
                            if (f < d.length) {
                                u = new e.Token("text", "", 0), u.content = d.slice(f), u.level = m, c.push(u)
                            };
                            w[n].children = a = i(a, t, c);
                        }
                    } else for (t--; a[t].level !== l.level && "link_open" !== a[t].type; ) {
                        t--;
                    }
                }
            }
        }
    }
};
