"use strict";

function r(e, t) {
    var n = e.bMarks[t] + e.blkIndent, r = e.eMarks[t];
    return e.src.substr(n, r - n);
}

function o(e) {
    var t, n = [], r = 0, o = e.length, i = 0, s = 0, a = !1, u = 0;
    for (t = e.charCodeAt(r); o > r; ) {
        t === 96 && i % 2 === 0 ? (a = !a, u = r) : 124 !== t || i % 2 !== 0 || a ? t === 92 ? i++ : i = 0 : (n.push(e.substring(s, r)), 
        s = r + 1);
        r++;
        if (r === o && a) {
            a = !1, r = u + 1
        };
        t = e.charCodeAt(r);
    }
    n.push(e.substring(s));
    return n;
}

module.exports = function(e, t, n, i) {
    var s, a, u, l, c, p, d, h, f, m, g;
    if (t + 2 > n) {
        return !1;
    }
    c = t + 1
    if (e.tShift[c] < e.blkIndent) {
        return !1;
    }
    u = e.bMarks[c] + e.tShift[c]
    if (u >= e.eMarks[c]) {
        return !1;
    }
    s = e.src.charCodeAt(u)
    if (124 !== s && 45 !== s && 58 !== s) {
        return !1;
    }
    a = r(e, t + 1)
    if (!/^[-:| ]+$/.test(a)) {
        return !1;
    }
    p = a.split("|")
    if (p.length < 2) {
        return !1;
    }
    for (h = [], l = 0; l < p.length; l++) {
        f = p[l].trim()
        if (!f) {
            if (l === 0 || l === p.length - 1) {
                continue;
            }
            return !1;
        }
        if (!/^:?-+:?$/.test(f)) {
            return !1;
        }
        f.charCodeAt(f.length - 1) === 58 ? h.push(f.charCodeAt(0) === 58 ? "center" : "right") : f.charCodeAt(0) === 58 ? h.push("left") : h.push("");
    }
    a = r(e, t).trim()
    if (a.indexOf("|") === -1) {
        return !1;
    }
    p = o(a.replace(/^\||\|$/g, ""))
    if (h.length !== p.length) {
        return !1;
    }
    if (i) {
        return !0;
    }
    for (d = e.push("table_open", "table", 1), d.map = m = [ t, 0 ], d = e.push("thead_open", "thead", 1), 
    d.map = [ t, t + 1 ], d = e.push("tr_open", "tr", 1), d.map = [ t, t + 1 ], l = 0; l < p.length; l++) {
        d = e.push("th_open", "th", 1);
        d.map = [ t, t + 1 ];
        if (h[l]) {
            d.attrs = [ [ "style", "text-align:" + h[l] ] ]
        };
        d = e.push("inline", "", 0);
        d.content = p[l].trim();
        d.map = [ t, t + 1 ];
        d.children = [];
        d = e.push("th_close", "th", -1);
    }
    for (d = e.push("tr_close", "tr", -1), d = e.push("thead_close", "thead", -1), d = e.push("tbody_open", "tbody", 1), 
    d.map = g = [ t + 2, 0 ], c = t + 2; n > c && !(e.tShift[c] < e.blkIndent) && (a = r(e, c).trim(), 
    -1 !== a.indexOf("|")); c++) {
        for (p = o(a.replace(/^\||\|$/g, "")), p.length = h.length, d = e.push("tr_open", "tr", 1), 
        l = 0; l < p.length; l++) {
            d = e.push("td_open", "td", 1);
            if (h[l]) {
                d.attrs = [ [ "style", "text-align:" + h[l] ] ]
            };
            d = e.push("inline", "", 0);
            d.content = p[l] ? p[l].trim() : "";
            d.children = [];
            d = e.push("td_close", "td", -1);
        }
        d = e.push("tr_close", "tr", -1);
    }
    d = e.push("tbody_close", "tbody", -1);
    d = e.push("table_close", "table", -1);
    m[1] = g[1] = c;
    e.line = c;
    return !0;
};