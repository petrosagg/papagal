"use strict";

function r(e, t) {
    var n = e.bMarks[t] + e.blkIndent, r = e.eMarks[t];
    return e.src.substr(n, r - n);
}

function o(e) {
    var t, n = [], r = 0, o = e.length, i = 0, s = 0, a = false, u = 0;
    for (t = e.charCodeAt(r); o > r; ) {
        if (t === 96 && i % 2 === 0) {
            a = !a;
            u = r;
        } else {
            if (124 !== t || i % 2 !== 0 || a) {
                if (t === 92) {
                    i++;
                } else {
                    i = 0;
                }
            } else {
                n.push(e.substring(s, r));
                s = r + 1;
            }
        }
        r++;
        if (r === o && a) {
            a = false, r = u + 1
        };
        t = e.charCodeAt(r);
    }
    n.push(e.substring(s));
    return n;
}

module.exports = function(e, t, n, i) {
    var s, a, u, l, c, p, d, h, f, m, g;
    if (t + 2 > n) {
        return false;
    }
    c = t + 1;
    if (e.tShift[c] < e.blkIndent) {
        return false;
    }
    u = e.bMarks[c] + e.tShift[c];
    if (u >= e.eMarks[c]) {
        return false;
    }
    s = e.src.charCodeAt(u);
    if (124 !== s && 45 !== s && 58 !== s) {
        return false;
    }
    a = r(e, t + 1);
    if (!/^[-:| ]+$/.test(a)) {
        return false;
    }
    p = a.split("|");
    if (p.length < 2) {
        return false;
    }
    for (h = [], l = 0; l < p.length; l++) {
        f = p[l].trim();
        if (!f) {
            if (l === 0 || l === p.length - 1) {
                continue;
            }
            return false;
        }
        if (!/^:?-+:?$/.test(f)) {
            return false;
        }
        if (f.charCodeAt(f.length - 1) === 58) {
            h.push(f.charCodeAt(0) === 58 ? "center" : "right");
        } else {
            if (f.charCodeAt(0) === 58) {
                h.push("left");
            } else {
                h.push("");
            }
        }
    }
    a = r(e, t).trim();
    if (a.indexOf("|") === -1) {
        return false;
    }
    p = o(a.replace(/^\||\|$/g, ""));
    if (h.length !== p.length) {
        return false;
    }
    if (i) {
        return true;
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
            if (p[l]) {
                d.content = p[l].trim();
            } else {
                d.content = "";
            }
            d.children = [];
            d = e.push("td_close", "td", -1);
        }
        d = e.push("tr_close", "tr", -1);
    }
    d = e.push("tbody_close", "tbody", -1);
    d = e.push("table_close", "table", -1);
    m[1] = g[1] = c;
    e.line = c;
    return true;
};
