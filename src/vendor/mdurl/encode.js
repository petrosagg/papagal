"use strict";

function r(e) {
    var t, n, r = i[e];
    if (r) {
        return r;
    }
    for (r = i[e] = [], t = 0; t < 128; t++) {
        n = String.fromCharCode(t);
        /^[0-9a-z]$/i.test(n) ? r.push(n) : r.push("%" + ("0" + t.toString(16).toUpperCase()).slice(-2));
    }
    for (t = 0; t < e.length; t++) {
        r[e.charCodeAt(t)] = e[t];
    }
    return r;
}

function o(e, t, n) {
    var i, s, a, u, l, c = "";
    for (typeof t != "string" && (n = t, t = o.defaultChars), typeof n == "undefined" && (n = !0), 
    l = r(t), i = 0, s = e.length; s > i; i++) {
        a = e.charCodeAt(i)
        if (n && a === 37 && s > i + 2 && /^[0-9a-f]{2}$/i.test(e.slice(i + 1, i + 3))) {
            c += e.slice(i, i + 3);
            i += 2;
        } else if (a < 128) {
            c += l[a];
        } else if (a >= 55296 && a <= 57343) {
            if (a >= 55296 && a <= 56319 && s > i + 1 && (u = e.charCodeAt(i + 1), u >= 56320 && u <= 57343)) {
                c += encodeURIComponent(e[i] + e[i + 1]);
                i++;
                continue;
            }
            c += "%EF%BF%BD";
        } else c += encodeURIComponent(e[i]);
    }
    return c;
}

var i = {};

o.defaultChars = ";/?:@&=+$,-_.!~*'()#";

o.componentChars = "-_.!~*'()";

module.exports = o;